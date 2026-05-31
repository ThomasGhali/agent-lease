import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

type CheckoutSession = Awaited<
  ReturnType<InstanceType<typeof Stripe>['checkout']['sessions']['create']>
>;

@Injectable()
export class PaymentService {
  private stripe: InstanceType<typeof Stripe> = new Stripe(
    process.env.STRIPE_SECRET_KEY!,
    {
      apiVersion: '2026-04-22.dahlia',
    },
  );
  private readonly logger = new Logger(PaymentService.name);

  async createCheckOutSession(
    priceId: string,
    userId: string,
    plan: string,
  ): Promise<CheckoutSession> {
    this.logger.log('i ran');

    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-result?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-result?success=false`,
      client_reference_id: userId,
      metadata: { plan },
    });
  }
}
