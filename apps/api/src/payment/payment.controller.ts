import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PlanType } from '@repo/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { CreateCheckoutDto } from 'src/payment/dto/create-checkout.dto';
import { PaymentService } from 'src/payment/payment.service';

@Controller('payment')
export class PaymentController {
  private readonly priceMap: Record<PlanType, string> = {
    [PlanType.PREMIUM]: 'price_1TZ3WL7PwqmvFxbDg1MxJjd7',
    [PlanType.ENTERPRISE]: 'price_1TZ3Wi7PwqmvFxbDDp8QVvne',
  };

  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  @UseGuards(SupabaseAuthGuard)
  async createCheckoutSession(
    @Body() body: CreateCheckoutDto,
    @CurrentUser() userId: string,
  ) {
    const { plan } = body;
    const priceId = this.priceMap[plan];

    const session = await this.paymentService.createCheckOutSession(
      priceId,
      userId,
      plan,
    );
    return { url: session.url }; // Stripe's hosted payment page
  }
}
