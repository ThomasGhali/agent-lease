import { Module, Global } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@Global()
@Module({
  providers: [
    {
      provide: Redis,
      useFactory: () => Redis.fromEnv(),
    },
  ],
  exports: [Redis],
})
export class RedisModule {}
