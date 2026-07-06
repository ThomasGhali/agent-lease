import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaidPlanType } from '@repo/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { CreateCheckoutDto } from 'src/payment/dto/create-checkout.dto';
import { PaymentService } from 'src/payment/payment.service';

@Controller('payment')
export class PaymentController {
  private get priceMap(): Record<PaidPlanType, string> {
    return {
      [PaidPlanType.PREMIUM]: process.env.STRIPE_PREMIUM_PRICE_ID as string,
      [PaidPlanType.ENTERPRISE]:
        process.env.STRIPE_ENTERPRISE_PRICE_ID || ('' as string),
    };
  }

  constructor(private readonly paymentService: PaymentService) {}
  private readonly logger = new Logger(PaymentController.name);

  @Post('create-checkout-session')
  @UseGuards(SupabaseAuthGuard)
  async createCheckoutSession(
    @Body() body: CreateCheckoutDto,
    @CurrentUser() userId: string,
  ) {
    const { plan } = body;
    const priceId = this.priceMap[plan];

    if (!priceId) {
      this.logger.error('Error: No price ID found for plan: ', plan);
      throw new InternalServerErrorException('Price ID not found');
    }

    const session = await this.paymentService.createCheckOutSession(
      priceId,
      userId,
      plan,
    );

    this.logger.log('Session URL: ', session.url);

    return { url: session.url }; // Stripe's hosted payment page
  }
}
