import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { WebhookCasesProcessorService } from './webhook-cases-processor.service';

import {
  StripeEvent,
  StripeSubscription,
  StripeCheckoutSession,
  StripeInvoice,
} from './webhook.types';

@Injectable()
export class WebhookService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  });

  constructor(
    private readonly webhookCasesProcessorService: WebhookCasesProcessorService,
  ) {}

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
    const dataObject = event.data.object;

    switch (eventType) {
      case 'checkout.session.completed':
        await this.webhookCasesProcessorService.handleCheckoutSessionCompleted(
          dataObject as StripeCheckoutSession,
        );
        break;
      case 'invoice.paid':
        await this.webhookCasesProcessorService.handleInvoicePaid(
          dataObject as StripeInvoice,
        );
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
