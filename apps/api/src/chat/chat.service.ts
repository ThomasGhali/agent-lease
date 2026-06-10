import { Injectable, Logger } from '@nestjs/common';
import { Message, PlanType } from '@repo/common';
import { Message as MessageDb, SenderType } from '@repo/db';
import { Redis } from '@upstash/redis';
import { Socket } from 'socket.io';
import { AiService } from 'src/chat/ai/ai.service';
import { PersistenceService } from 'src/chat/persistence/persistence.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
    private readonly redis: Redis,
  ) {}

  private socketRoomMap = new Map<string, Message[]>(); // TODO: to be moved to own service
  private socketToRoomMap = new Map<string, string>(); // Link socket.id -> roomName

  private normalizeDomain(value: string) {
    return value
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .toLowerCase();
  }

  async validateAgent(origin: string, agentId: string) {
    if (!origin || !agentId) return null;

    const agent = await this.prisma.client.agent.findFirst({
      where: {
        id: agentId,
      },
    });

    if (!agent) return null;

    if (this.normalizeDomain(origin) !== agent.hostname) {
      this.logger.warn(
        `Origin mismatch: provided ${origin} vs expected ${agent.hostname}`,
      );
      return null;
    }

    return agent;
  }

  handleConnection(client: Socket) {
    const auth = client.handshake.auth;
    this.logger.log(`User ${client.id} is connected to the websocket`);
    this.logger.log(auth);
  }

  handleDisconnect(client: Socket) {
    const roomName = this.socketToRoomMap.get(client.id);
    this.logger.log(
      `Chat user ${client.id} disconnected. Found room: ${roomName || 'none'}`,
    );

    if (roomName) {
      this.socketToRoomMap.delete(client.id);
      this.socketRoomMap.delete(roomName);
    }
  }

  async handleChatJoin(socket: Socket) {
    // TODO: add room dto
    const agentId = socket.data.agentId;
    const visitorId = socket.data.visitorId;
    const userName = socket.id.substring(0, 4);
    const roomName = `${agentId}:${visitorId}`;

    if (socket.rooms.has(roomName)) {
      this.logger.log(`User ${userName} is already in room ${roomName}`);
      return { status: 'error', message: 'User is already in room' };
    }

    if (!this.socketRoomMap.has(roomName)) {
      const rawMessages: MessageDb[] =
        await this.persistenceService.getMessages(roomName);
      this.socketRoomMap.set(
        roomName,
        rawMessages.map(
          (msg: MessageDb): Message => ({
            sender: msg.sender,
            message: msg.content || '',
          }),
        ),
      );
    }

    const messages = this.socketRoomMap.get(roomName)!;

    void socket.join(roomName);
    this.socketToRoomMap.set(socket.id, roomName);
    this.logger.log(`User ${userName} joined room: ${roomName}`);

    socket.emit('message', messages);
    socket.emit('message', [
      { sender: 'SYSTEM', message: `You have joined room: ${roomName}` },
    ]);

    return { status: 'success', message: 'User joined room' };
  }

  async handleMessage(socket: Socket, messagePayload: { message: string }) {
    const { message } = messagePayload;
    const { agentId, ownerId, ownerPlan, visitorId } = socket.data as {
      agentId: string;
      ownerId: string;
      ownerPlan: PlanType;
      visitorId: string;
    };
    const roomName = `room:${agentId}:${visitorId}`;

    if (!message) {
      socket.emit('chat_error', {
        message: 'Message not sent, please try again later',
      });
      return {
        status: 'error',
        message: 'Message not sent, please try again later',
      };
    }

    // If room exists, don't fetch from db
    let socketRoom = this.socketRoomMap.get(roomName);
    if (!socketRoom) {
      const rawMessages = await this.persistenceService.getMessages(roomName);

      // If no room history exists at all, handle gracefully or create it
      socketRoom = (rawMessages || []).map((m: MessageDb) => ({
        sender: m.sender,
        message: m.content || '',
      }));

      this.socketRoomMap.set(roomName, socketRoom);
    }

    socketRoom.push({
      sender: SenderType.VISITOR,
      message,
    });

    try {
      await this.persistenceService.saveMessage(
        message,
        agentId,
        SenderType.VISITOR,
        roomName,
      );

      socket.emit('message', [{ sender: SenderType.VISITOR, message }]);

      const { response, usage } = await this.aiService.aiGenerate(socketRoom);

      if (!usage?.totalTokens) {
        this.logger.error(
          `No usage found from LLM API for agentId: ${agentId} with visitorId: ${visitorId}`,
        );
        socket.emit('chat_error', {
          message: 'Internal server error, try again later.',
        });
        return { status: 'error', message: 'Internal server error' };
      }

      const pipeline = this.redis.pipeline();
      pipeline.hincrby(`user:${ownerId}`, 'usage', usage.totalTokens);
      pipeline.incrby(`global_tokens:${ownerPlan}:usage`, usage.totalTokens);

      await Promise.all([
        pipeline.exec(),
        this.persistenceService.saveMessage(
          response,
          agentId,
          SenderType.AI_SUPPORT,
          roomName,
        ),
      ]);

      socketRoom.push({
        sender: SenderType.AI_SUPPORT,
        message: response,
      });

      socket.emit('message', [
        { sender: SenderType.AI_SUPPORT, message: response },
      ]);
    } catch (error) {
      this.logger.error(
        `Error in handleMessage for agentId: ${agentId} with visitorId: ${visitorId}: `,
        error,
      );
      socket.emit('chat_error', {
        message: 'Internal server error, try again later.',
      });
      return { status: 'error', message: 'Internal server error' };
    }

    return { status: 'success' };
  }
}
