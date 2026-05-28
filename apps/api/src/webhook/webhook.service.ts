import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

type StripeEvent = ReturnType<
  InstanceType<typeof Stripe>['webhooks']['constructEvent']
>;

type StripeSubscription = Awaited<
  ReturnType<InstanceType<typeof Stripe>['subscriptions']['retrieve']>
>;

@Injectable()
export class WebhookService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  });

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    const webhookSecretKey = process.env.WEBHOOK_SECRET_KEY;

    if (!webhookSecretKey)
      throw new BadRequestException(
        "Stripe's webhook secret key is missing, please add it to your .env file.",
      );

    let event: StripeEvent;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecretKey,
      );
    } catch (error) {
      throw new BadRequestException(
        error || '⚠️  Webhook signature verification failed.',
      );
    }

    const eventType = event.type;

    switch (eventType) {
      case 'checkout.session.completed':
        console.log('payment is successful, subscription is created');
        break;
      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a customer accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;
      case 'customer.subscription.updated':
        // Fires when a user cancels, changes plans, or goes past_due
        const updatedSubscription = event.data.object as StripeSubscription;

        if (updatedSubscription.cancel_at_period_end) {
          // User clicked "Cancel subscription", but their paid time isn't up yet.
          // Do NOT cut off access yet. Just mark "will_cancel_at: date" in your DB.
        }
        break;
      case 'customer.subscription.deleted':
        // Fires when the subscription fully ends/expires
        const deletedSubscription = event.data.object as StripeSubscription;

        // 🚨 CUT OFF ACCESS HERE
        // Set status to 'canceled' or 'inactive' in your database for this customer.
        break;
      case 'invoice.payment_failed':
        // The payment failed or the customer doesn't have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      default:
      // Unhandled event type
    }
  }
}
