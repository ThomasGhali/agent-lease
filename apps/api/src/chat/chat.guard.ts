import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsRateLimitGuard implements CanActivate {
  private ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(4, '10 s'),
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const agent = client.data.agentId;
    const ip = client.data.ip;

    const safeIp = ip ? String(ip) : 'unknown';

    if (!agent) {
      throw new WsException('Missing agentId in connection data');
    }

    const identifier = `ratelimit:${agent}:${safeIp}`;
    const { success } = await this.ratelimit.limit(identifier);

    if (!success) {
      throw new WsException('Too many requests, please try again later.');
    }

    return true;
  }
}
