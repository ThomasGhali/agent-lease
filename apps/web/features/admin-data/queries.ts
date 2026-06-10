import {
  AdminDashboardResult,
  AdminDataQuery,
  RecentPayment,
} from '@/features/admin-data/types'
import { redis } from '@/lib/redis/redis'
import { stripe } from '@/lib/stripe/stripe'
import { db, PlanType, SubscriptionStatus } from '@repo/db'

export const getAdminDashboardData =
  async (): Promise<AdminDashboardResult> => {
    const date = new Date()
    date.setDate(1) // the 1st day of the month
    date.setHours(0, 0, 0, 0) // 12am (the start of that day)

    const startOfMonth = Math.floor(date.getTime() / 1000) // time in ms

    const [
      globalFreeTokensUsage,
      globalPremiumTokensUsage,
      totalPayingCustomers,
      stripeCharges,
    ] = (await Promise.all([
      redis.get('global_tokens:FREE:usage'),
      redis.get('global_tokens:PREMIUM:usage'),
      db.subscription.count({
        where: {
          plan: {
            not: PlanType.FREE,
          },
          status: SubscriptionStatus.ACTIVE,
        },
      }),
      stripe.charges
        .list({
          created: { gte: startOfMonth },
        })
        .catch(() => ({ data: [] })),
    ])) as AdminDataQuery

    const revenueThisMonth = stripeCharges.data
      .filter(charge => charge.status === 'succeeded' && !charge.refunded)
      .reduce((sum, charge) => sum + charge.amount / 100, 0)

    const recentPayments: RecentPayment[] = stripeCharges.data.map(charge => ({
      id: charge.id,
      email: charge.billing_details.email || 'N/A',
      amount: charge.amount / 100,
      currency: charge.currency.toUpperCase(),
      status: charge.status,
      date: new Date(charge.created * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }))

    return {
      metrics: {
        globalFreeTokensUsage: globalFreeTokensUsage ?? '0',
        globalPremiumTokensUsage: globalPremiumTokensUsage ?? '0',
        totalPayingCustomers,
        revenueThisMonth: revenueThisMonth.toFixed(2),
      },
      recentPayments,
    }
  }
