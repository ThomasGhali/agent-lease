import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PersistanceService } from 'src/chat/persistence/persistence.service';

// type for the socketRoomMap messages
type messageType = {
  sender: string;
  message: string;
}; // TODO: change its place

@WebSocketGateway(3002, { namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly persistanceService: PersistanceService) {}

  @WebSocketServer()
  server: Server;

  // Track which room each socket belongs to
  // Cons: if you have multiple servers, the other server
  //  won't be able to read that map, so it would have to
  //  fetch data from upstash and store it by itself which
  //  i think is still worth doing.
  private socketRoomMap = new Map<string, messageType[]>(); // TODO: to be moved to own service
  private socketToRoomMap = new Map<string, string>(); // Track socket.id -> roomName
  private readonly userId = '12344321';

  handleConnection(client: Socket) {
    console.log(`Chat user ${client.id} connected to the websocket`);
  }

  handleDisconnect(client: Socket) {
    const roomName = this.socketToRoomMap.get(client.id);
    console.log(
      `Chat user ${client.id} disconnected. Found room: ${roomName || 'none'}`,
    );

    if (roomName) {
      this.socketRoomMap.delete(roomName);
      this.socketToRoomMap.delete(client.id);
    }
    console.log('socketRoomMap after disconnect:', this.socketRoomMap);
  }

  @SubscribeMessage('join-chat')
  async handleChatJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    const userName = socket.id.substring(0, 4);

    if (socket.rooms.size > 3)
      return { status: 'error', message: 'Too many rooms for this connection' };

    if (socket.rooms.has(roomName)) {
      console.log(`User ${userName} is already in room ${roomName}`);
      return { status: 'error', message: 'User is already in room' };
    }

    const messages = await this.persistanceService.getMessages(roomName);
    this.socketRoomMap.set(roomName, messages);

    socket.join(roomName);
    this.socketToRoomMap.set(socket.id, roomName);
    console.log(`User ${userName} joined room: ${roomName}`);

    socket.to(roomName).emit('message', `Say welcome to ${userName}`);
    socket.emit('message', `You have joined room: ${roomName}`);

    return { status: 'success', message: 'User joined room' };
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() messagePayload: any, // TODO: use dto here
  ) {
    const message = messagePayload.message;
    const roomName = messagePayload.roomName;
    const socketRoom = this.socketRoomMap.get(roomName);
    if (!socketRoom) return { status: 'error', message: 'No room found' };

    socketRoom.push({ sender: 'VISITOR', message });

    this.persistanceService.saveMessage(
      message,
      this.userId,
      'VISITOR',
      roomName,
    );
    
    socket.to(roomName).emit('message', message);
    console.log('socketRoomMap:', this.socketRoomMap);
    return { status: 'ok' };
  }

  // @SubscribeMessage('typing')
  // handleTyping(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() isTyping: boolean,
  // ) {
  //   const roomName = this.socketRoomMap.get(socket.id);
  //   if (!roomName) return;

  //   const status = isTyping ? `${socket.id.substring(0, 4)} is typing...` : '';
  //   socket.to(roomName).emit('typing-status', status);
  // }
}

// TODO: remove
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ChatCacheService {
//   // Store the messages AND the last time someone interacted with the room
// private chatRooms = new Map<
//   string,
//   { lastActive: number; messages: any[] }
// >();

//   constructor() {
//     // 1. THE SWEEPER: One single interval for the entire server.
//     // Runs every 5 minutes (300,000 ms)
//     setInterval(() => this.cleanupIdleRooms(), 300000);
//   }

//   saveMessage(roomId: string, message: any) {
//     const room = this.chatRooms.get(roomId) || {
//       lastActive: Date.now(),
//       messages: [],
//     };

//     room.messages.push(message);
//     room.lastActive = Date.now(); // Reset the clock every time there's activity!

//     this.chatRooms.set(roomId, room);
//   }

//   // 2. THE CLEANUP LOGIC
//   private cleanupIdleRooms() {
//     const now = Date.now();
//     const expiryTime = 1000 * 60 * 60; // 1 Hour

//     let deletedCount = 0;

//     for (const [roomId, roomData] of this.chatRooms.entries()) {
//       // If the room hasn't had a new message in over 1 hour...
//       if (now - roomData.lastActive > expiryTime) {
//         this.chatRooms.delete(roomId); // ...destroy it.
//         deletedCount++;
//       }
//     }

//     if (deletedCount > 0) {
//       console.log(
//         `[Cache Sweeper] Cleared ${deletedCount} inactive rooms from memory.`,
//       );
//     }
//   }
// }
