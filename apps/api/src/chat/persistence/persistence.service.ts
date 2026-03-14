import { Injectable } from '@nestjs/common';
import { db } from '@repo/db';
import { Redis } from '@upstash/redis';
import { SenderType } from '@repo/db';
import { Message } from '@repo/common';

@Injectable()
export class PersistanceService {
  // TODO: add feature
  /*   // Track which room each socket belongs to
  // Cons: if you have multiple servers, the other server
  //  won't be able to read that map, so it would have to
  //  fetch data from upstash and store it by itself which
  //  i think is still worth doing.

  private usersMap = new Map<
    string, // userId
    Set<string>
  >();
  private roomsMap = new Map<
    string, // roomName
    { lastActive: number; messages: any[] }
  >();
 */
  private readonly TTL = 3 * 60 * 60; // 3h expiry
  private readonly redis = Redis.fromEnv();

  async saveMessage(
    message: string,
    userId: string,
    sender: SenderType,
    roomName: string,
  ) {
    // TODO: add user id for logged in users
    const userKey = `user:${userId}:rooms`;
    const messageKey = `room:${roomName}:data`;
    const messagePayload = {
      sender,
      message,
    };

    const pipeline = this.redis.pipeline();

    pipeline.sadd(userKey, roomName);
    pipeline.rpush(messageKey, messagePayload);
    pipeline.ltrim(messageKey, -15, -1);
    pipeline.expire(messageKey, this.TTL);
    pipeline.expire(userKey, this.TTL);

    await pipeline.exec();

    db.room.upsert({
      where: {
        id: roomName,
      },
      update: {
        updatedAt: new Date(),
        messages: {
          create: {
            content: message,
            sender: sender,
          },
        },
      },
      create: {
        userId: userId,
        id: roomName,
        messages: {
          create: {
            content: message,
            sender: sender,
          },
        },
      },
    });

    /* 
      in redis we'll have this structure: user:${userId}:rooms 
        to store the rooms that user has.
        
        we'll also have: room:${roomId}:data which should 
        have the room data.
        also trim last 10 messages to make sure that the context is
        not too much (expensive tokens)
    */
  }

  async getMessages(roomName: string) {
    const data = await this.redis.lrange<Message>(
      `room:${roomName}:data`,
      0,
      -1,
    );
    console.log('data:', data);
    return data || [];
  }
}

// TODO: combine three layers caching
/* 
async saveMessage(roomId: string, userId: string, message: any) {
  // Check our "Shield" (Local Map) BEFORE we modify it
  const isNewRoomLocally = !this.roomsMap.has(roomId);

  // 1. UPDATE LOCAL (The Brains)
  const room = this.roomsMap.get(roomId) || { messages: [], lastActive: Date.now() };
  room.messages.push(message);
  
  // Local map handles the heavy lifting of trimming
  if (room.messages.length > 15) room.messages.shift();
  room.lastActive = Date.now();
  
  this.roomsMap.set(roomId, room);

  // 2. DYNAMIC UPSTASH WRITES (Cost Saving)
  const redisCommands = [];

  // ONLY write to the User's Set if the room wasn't in our local memory
  if (isNewRoomLocally) {
    redisCommands.push(this.redis.sadd(`user:${userId}:rooms`, roomId));
  }

  // EXACTLY 1 WRITE: Overwrite the Redis key with the perfectly trimmed local array
  redisCommands.push(this.redis.set(`room:${roomId}:messages`, JSON.stringify(room.messages)));

  // Execute whatever commands we gathered dynamically
  await Promise.all(redisCommands);

  // 3. BACKGROUND SUPABASE SYNC
  this.supabase.from('messages').insert({ room_id: roomId, ...message })
    .then(({ error }) => { if (error) console.error(error); });
}
*/
