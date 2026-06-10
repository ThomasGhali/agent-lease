import Stripe from 'stripe'

export type AdminDataQuery = [
  string | null,
  string | null,
  number,
  {
    data: Stripe.Charge[]
  },
]

export type Metrics = {
  globalFreeTokensUsage: string
  globalPremiumTokensUsage: string
  totalPayingCustomers: number
  revenueThisMonth: string
  revenuePercentageChange: number | null
}

export type RecentPayment = {
  id: string
  email: string
  amount: number
  currency: string
  status: string
  date: string
}

export interface AdminDashboardResult {
  metrics: Metrics
  recentPayments: RecentPayment[]
}
