import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateCheckoutDto,
  PlanType,
} from 'src/payment/dto/create-checkout.dto';
import { PaymentService } from 'src/payment/payment.service';

@Controller('payment')
export class PaymentController {
  private readonly priceMap: Record<PlanType, string> = {
    [PlanType.PREMIUM]: 'price_1TZ3WL7PwqmvFxbDg1MxJjd7',
    [PlanType.ENTERPRISE]: 'price_1TZ3Wi7PwqmvFxbDDp8QVvne',
  };

  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: CreateCheckoutDto) {
    const { plan } = body;
    const priceId = this.priceMap[plan];

    const session = await this.paymentService.createCheckOutSession(priceId);
    return { url: session.url }; // Stripe’s hosted payment page
  }
}
