import { Logger, Injectable } from '@nestjs/common';
import { StripeCheckoutSession, StripeInvoice } from './webhook.types';
import { db } from '@repo/db';
import { PlanType } from '@repo/common';

@Injectable()
export class WebhookCasesProcessorService {
  private readonly logger = new Logger(WebhookCasesProcessorService.name);

  async handleCheckoutSessionCompleted(session: StripeCheckoutSession) {
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    if (!stripeCustomerId || !stripeSubscriptionId) {
      this.logger.warn(
        'Stripe customer or subscription is missing. Ignoring event.',
      );
      return;
    }

    const userId = session.client_reference_id;

    if (!userId) {
      this.logger.warn('No user ID found in session. Ignoring event.');
      return;
    }

    const plan = (session.metadata?.plan as PlanType) || PlanType.PREMIUM;

    await db.subscription.upsert({
      where: { userId },
      update: {
        stripeCustomerId,
        stripeSubscriptionId,
        status: 'ACTIVE',
        plan,
      },
      create: {
        userId,
        stripeCustomerId,
        stripeSubscriptionId,
        status: 'ACTIVE',
        plan,
      },
    });
  }

  async handleInvoicePaid(invoice: StripeInvoice) {
    const invoiceSubscriptionId = invoice.parent?.subscription_details
      ?.subscription as string;

    if (!invoiceSubscriptionId) {
      this.logger.warn(
        `Invoice ${invoice.id} has no subscription details in parent. Ignoring event.`,
      );
      return;
    }

    // Safely use optional chaining in case the lines array is empty
    const currentPeriodEnd = invoice.lines.data[0]?.period?.end as number | undefined;

    if (!currentPeriodEnd) {
      this.logger.warn(
        `Invoice ${invoice.id} has no current period end. Ignoring event.`,
      );
      return;
    }

    // Use updateMany instead of update to prevent Prisma from throwing a fatal P2025 error if not found
    const updateResult = await db.subscription.updateMany({
      where: { stripeSubscriptionId: invoiceSubscriptionId },
      data: { currentPeriodEnd: new Date(currentPeriodEnd * 1000) },
    });

    if (updateResult.count === 0) {
      this.logger.warn(
        `Subscription ${invoiceSubscriptionId} not found in database.`,
      );
      return;
    }
  }
}
