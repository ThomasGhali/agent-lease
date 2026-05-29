import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import { WebhookModule } from './webhook/webhook.module';
import { SupabaseModule } from './supabase/supabase.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ChatModule, PaymentModule, WebhookModule, SupabaseModule, PrismaModule],
})
export class AppModule {}
