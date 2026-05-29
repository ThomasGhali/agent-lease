import { Logger, Injectable } from '@nestjs/common';
import { StripeCheckoutSession } from './webhook.types';
import { db } from '@repo/db';
import { PlanType } from '@repo/common';

@Injectable()
export class WebhookCasesProcessorService {
  private readonly logger = new Logger(WebhookCasesProcessorService.name);

  async handleCheckoutSessionCompleted(session: StripeCheckoutSession) {
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    if (!stripeCustomerId || !stripeSubscriptionId) {
      this.logger.warn('Stripe customer or subscription is missing. Ignoring event.');
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
}
