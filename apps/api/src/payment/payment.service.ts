import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';

type CheckoutSession = Awaited<
  ReturnType<
    InstanceType<typeof StripeService>['checkout']['sessions']['create']
  >
>;

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly stripe: StripeService) {}

  async createCheckOutSession(
    priceId: string,
    userId: string,
    plan: string,
  ): Promise<CheckoutSession> {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-result?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-result?success=false`,
      client_reference_id: userId,
      metadata: { plan },
      subscription_data: {
        metadata: {
          userId,
          plan,
        },
      },
    });
  }
}
