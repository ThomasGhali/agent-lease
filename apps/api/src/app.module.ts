import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { WebhookService } from './webhook/webhook.service';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [ChatModule],
  controllers: [PaymentController, WebhookController],
  providers: [PaymentService, WebhookService],
})
export class AppModule {}
