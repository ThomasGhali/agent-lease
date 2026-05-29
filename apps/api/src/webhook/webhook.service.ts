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
        break;

      case 'customer.subscription.updated':
        // TODO (PROD): Handle cancellations, plan changes, and past_due transitions.
        const updatedSubscription = event.data.object as StripeSubscription;

        if (updatedSubscription.cancel_at_period_end) {
          // User requested cancellation, but the paid period hasn't ended.
          // Do NOT revoke access yet — store the scheduled cancellation date in your DB.
        }
        break;

      case 'customer.subscription.deleted':
        // Fires when a subscription fully expires or is terminated.
        const deletedSubscription = event.data.object as StripeSubscription;

        // ⚠️ Revoke access — set status to 'CANCELED' or 'INACTIVE' in your DB.
        break;

      case 'invoice.payment_failed':
        // TODO (PROD): Handle failed payments.
        // The customer's payment method is invalid or insufficient.
        // Subscription transitions to past_due — notify the customer and
        // direct them to the billing portal to update their payment method.
        break;

      // TODO (PROD): Add handlers for the following events:
      // 1. checkout.session.async_payment_succeeded — same provisioning logic as checkout.session.completed, for delayed payment methods (e.g. bank transfers).
      // 2. checkout.session.async_payment_failed    — handle failure for delayed payment methods.
      // 3. customer.subscription.trial_will_end     — notify the customer 3 days before trial ends (legally required in some regions).
      default:
      // Unhandled event type — no action taken.
    }
  }
}
