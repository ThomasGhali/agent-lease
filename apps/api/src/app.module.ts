import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [ChatModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
