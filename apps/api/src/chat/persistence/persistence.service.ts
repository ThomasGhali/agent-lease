import { Injectable } from '@nestjs/common';
import { db } from '@repo/db';
import { Redis } from '@upstash/redis';
import { SenderType } from '@repo/db';
import { Message } from '@repo/db';

@Injectable()
export class PersistenceService {
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

  constructor(private readonly redis: Redis) {}
  async saveMessage(
    message: string,
    agentId: string,
    sender: SenderType,
    roomName: string,
  ) {
    // TODO: add user id for logged in users
    const userKey = `user:${agentId}:rooms`;
    const messageKey = `room:${roomName}:data`;
    const messagePayload = {
      sender,
      content: message,
    };

    const pipeline = this.redis.pipeline();

    pipeline.sadd(userKey, roomName);
    pipeline.rpush(messageKey, messagePayload);
    pipeline.ltrim(messageKey, -15, -1);
    pipeline.expire(messageKey, this.TTL);
    pipeline.expire(userKey, this.TTL);

    void db.room.upsert({
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
        agentId: agentId,
        id: roomName,
        messages: {
          create: {
            content: message,
            sender: sender,
          },
        },
      },
    });

    await pipeline.exec();
  }

  async getMessages(roomName: string) {
    const data = await this.redis.lrange<Message>(
      `room:${roomName}:data`,
      0,
      -1,
    );

    return data || [];
  }
}
