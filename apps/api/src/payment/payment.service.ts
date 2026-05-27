import { Injectable } from '@nestjs/common';
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

  async createCheckOutSession(priceId: string): Promise<CheckoutSession> {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/result?success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/result?cancel`,
    });
  }
}
