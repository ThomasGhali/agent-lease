import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Socket } from 'socket.io';

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { WsException } from '@nestjs/websockets';
import { PLAN_LIMITS, PlanType } from '@repo/common';

@Injectable()
export class WsRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(WsRateLimitGuard.name);
  private ratelimit: Ratelimit;

  constructor(private readonly redis: Redis) {
    this.ratelimit = new Ratelimit({
      redis: this.redis,
      limiter: Ratelimit.slidingWindow(4, '10 s'),
    });
  }

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

@Injectable()
export class WsTokenQuotaGuard implements CanActivate {
  private readonly logger = new Logger(WsTokenQuotaGuard.name);

  constructor(private readonly redis: Redis) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const ownerId: string | undefined = client.data.ownerId;

    if (!ownerId) throw new WsException('Missing ownerId in connection data');

    const data = await this.redis.hmget<{ plan: PlanType; usage: string }>(
      `user:${ownerId}`,
      'plan',
      'usage',
    );

    if (data === null)
      throw new WsException("User data doesn't exist in redis");

    const userPlan = data.plan as PlanType;
    const userUsage = Number(data.usage);

    if (!userPlan || !userUsage)
      throw new WsException("User's plan or usage doesn't exist in redis");

    const userTokenLimit = PLAN_LIMITS[userPlan].tokensLimit;

    client.data.ownerPlan = userPlan;

    if (userUsage >= userTokenLimit) {
      throw new WsException('Token quota exceeded. Please upgrade your plan.');
    }

    return true;
  }
}
