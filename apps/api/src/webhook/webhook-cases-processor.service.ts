import { Logger, Injectable } from '@nestjs/common';
import { StripeCheckoutSession, StripeInvoice } from './webhook.types';
import { PlanType } from '@repo/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookCasesProcessorService {
  private readonly supabaseAdminClient;

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
  ) {
    this.supabaseAdminClient = this.supabaseService.getAdminClient();
  }

  private readonly logger = new Logger(WebhookCasesProcessorService.name);

  async handleCheckoutSessionCompleted(session: StripeCheckoutSession) {
    try {
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

      const plan =
        session.metadata?.plan === PlanType.PREMIUM
          ? PlanType.PREMIUM
          : PlanType.ENTERPRISE;

      await this.prisma.client.subscription.upsert({
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

      const { error } = await this.supabaseAdminClient.auth.admin.updateUserById({
        userId,
        app_metadata: {
          plan,
        },
      });

      if (error) {
        this.logger.error(
          `Failed to update user ${userId} metadata: ${error.message}`,
          error,
        );
        return;
      }
    } catch (error) {
      this.logger.error(
        `Error handling checkout session completed event for session ${session.id}: ${(error as Error).message}`,
        error,
      );
    }
  }

  async handleInvoicePaid(invoice: StripeInvoice) {
    try {
      const invoiceSubscriptionId = invoice.parent?.subscription_details
        ?.subscription as string;

      if (!invoiceSubscriptionId) {
        this.logger.warn(
          `Invoice ${invoice.id} has no subscription details in parent. Ignoring event.`,
        );
        return;
      }

      const currentPeriodEnd = invoice.lines.data[0]?.period?.end as
        | number
        | undefined;

      if (!currentPeriodEnd) {
        this.logger.warn(
          `Invoice ${invoice.id} has no current period end. Ignoring event.`,
        );
        return;
      }

      // Used updateMany instead of update to prevent Prisma from throwing an error if not found
      const updateResult = await this.prisma.client.subscription.updateMany({
        where: { stripeSubscriptionId: invoiceSubscriptionId },
        data: {
          currentPeriodEnd: new Date(currentPeriodEnd * 1000),
          status: 'ACTIVE',
        },
      });

      if (updateResult.count === 0) {
        this.logger.warn(
          `Subscription ${invoiceSubscriptionId} not found in database.`,
        );
        return;
      }
    } catch (error) {
      this.logger.error(
        `Error handling invoice paid event for invoice ${invoice.id}: ${(error as Error).message}`,
        error,
      );
    }
  }
}
