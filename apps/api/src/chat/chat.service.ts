import { Injectable } from '@nestjs/common';
import { Message } from '@repo/common';
import { Message as MessageDb, SenderType } from '@repo/db';
import { Socket } from 'socket.io';
import { PersistenceService } from 'src/chat/persistence/persistence.service';

@Injectable()
export class ChatService {
  constructor(private readonly persistenceService: PersistenceService) {}

  private socketRoomMap = new Map<string, Message[]>(); // TODO: to be moved to own service
  private socketToRoomMap = new Map<string, string>(); // Track socket.id -> roomName
  private readonly userId = '12344321';

  handleConnection(client: Socket) {
    console.log(`User ${client.id} is connected to the websocket`);
  }

  handleDisconnect(client: Socket) {
    const roomName = this.socketToRoomMap.get(client.id);
    console.log(
      `Chat user ${client.id} disconnected. Found room: ${roomName || 'none'}`,
    );

    if (roomName) {
      this.socketToRoomMap.delete(client.id);
      this.socketRoomMap.delete(roomName);
    }
  }

  async handleChatJoin(socket: Socket, roomName: string) {
    const userName = socket.id.substring(0, 4);

    if (socket.rooms.size > 3)
      return { status: 'error', message: 'Too many rooms for this connection' };

    if (socket.rooms.has(roomName)) {
      console.log(`User ${userName} is already in room ${roomName}`);
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

    socket.join(roomName);
    this.socketToRoomMap.set(socket.id, roomName);
    console.log(`User ${userName} joined room: ${roomName}`);

    socket.emit('message', messages);
    socket.emit('message', [
      { sender: 'SYSTEM', message: `You have joined room: ${roomName}` },
    ]);

    return { status: 'success', message: 'User joined room' };
  }

  async handleMessage(
    socket: Socket,
    messagePayload: any, // TODO: use dto here
  ) {
    const message = messagePayload.message;
    const roomName = messagePayload.roomName;

    if (!message || !roomName)
      return { status: 'error', message: 'Missing message or roomName' };

    // If room exists, don't fetch from db
    let socketRoom = this.socketRoomMap.get(roomName);
    if (!socketRoom) {
      const rawMessages = await this.persistenceService.getMessages(roomName);
      if (!rawMessages || rawMessages.length === 0) {
        return { status: 'error', message: 'No room found' };
      }
      socketRoom = rawMessages.map(
        (m: MessageDb): Message => ({
          sender: m.sender,
          message: m.content || '',
        }),
      );
      this.socketRoomMap.set(roomName, socketRoom);
    }

    socketRoom.push({
      sender: SenderType.VISITOR,
      message,
    });

    await this.persistenceService.saveMessage(
      message,
      this.userId,
      SenderType.VISITOR,
      roomName,
    );

    socket.to(roomName).emit('message', [{ sender: 'VISITOR', message }]);
    return { status: 'success' };
  }
}
