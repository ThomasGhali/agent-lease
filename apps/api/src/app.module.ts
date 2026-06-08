import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import { WebhookModule } from './webhook/webhook.module';
import { SupabaseModule } from './supabase/supabase.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    RedisModule,
    ChatModule,
    PaymentModule,
    WebhookModule,
    SupabaseModule,
    PrismaModule,
    StripeModule,
  ],
})
export class AppModule {}
