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
import { PersistenceService } from 'src/chat/persistence/persistence.service';

import { Message } from '@repo/common';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway(3002, { namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  // Track which room each socket belongs to
  // Cons: if you have multiple servers, the other server
  //  won't be able to read that map, so it would have to
  //  fetch data from upstash and store it by itself which
  //  i think is still worth doing.
  private readonly userId = '12344321';

  handleConnection(client: Socket) {
    this.chatService.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.chatService.handleDisconnect(client);
  }

  @SubscribeMessage('join-chat')
  async handleChatJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    return await this.chatService.handleChatJoin(socket, roomName);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() messagePayload: any, // TODO: use dto here
  ) {
    return await this.chatService.handleMessage(socket, messagePayload);
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
