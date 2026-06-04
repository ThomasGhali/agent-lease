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
    const data = context.switchToWs().getData<{ agentId?: string }>();

    const agent = data?.agentId;

    const rawIp =
      client.handshake.headers['x-forwarded-for'] || client.handshake.address;
    const ip = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const safeIp = ip ? String(ip) : 'unknown';

    if (!agent) {
      throw new WsException('Missing agentId in request data');
    }

    const identifier = `ratelimit:${agent}:${safeIp}`;
    const { success } = await this.ratelimit.limit(identifier);

    if (!success) {
      throw new WsException('Too many requests, please try again later.');
    }

    return true;
  }
}
