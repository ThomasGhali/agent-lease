import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metrics } from '@/features/admin-data/types'
import {
  Activity,
  CreditCard,
  Minus,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

function PercentageChangeBadge({
  percentageChange,
}: {
  percentageChange: number | null
}) {
  if (percentageChange === null) {
    return null
  }

  const isRevenueUp = percentageChange > 0
  const isRevenueDown = percentageChange < 0

  return (
    <Badge
      variant="outline"
      className={
        isRevenueUp
          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
          : isRevenueDown
            ? 'border-red-500/20 bg-red-500/10 text-red-500'
            : 'text-muted-foreground'
      }
    >
      {isRevenueUp ? (
        <TrendingUp className="mr-1 size-3" />
      ) : isRevenueDown ? (
        <TrendingDown className="mr-1 size-3" />
      ) : (
        <Minus className="mr-1 size-3" />
      )}
      {isRevenueUp ? '+' : ''}
      {percentageChange.toFixed(1)}%
    </Badge>
  )
}

export function SectionCards({ metrics }: { metrics: Metrics }) {
  const {
    totalPayingCustomers,
    globalFreeTokensUsage,
    globalPremiumTokensUsage,
    revenueThisMonth,
    revenuePercentageChange,
  } = metrics

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Revenue Card */}
      <Card className="group @container/card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Revenue This Month
            <div className="bg-primary/10 text-primary group-hover:bg-primary/20 rounded-full p-2 transition-colors">
              <CreditCard className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="flex items-center gap-2 text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            ${revenueThisMonth}
            <PercentageChangeBadge percentageChange={revenuePercentageChange} />
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 text-xs">
          Total gross volume via Stripe (compared to the previous month)
        </CardFooter>
      </Card>

      {/* Active Subscribers Card */}
      <Card className="group @container/card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Active Subscribers
            <div className="rounded-full bg-blue-500/10 p-2 text-blue-500 transition-colors group-hover:bg-blue-500/20">
              <Users className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {totalPayingCustomers.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          Currently active premium plans
        </CardFooter>
      </Card>

      {/* Premium Tokens Card */}
      <Card className="group @container/card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Premium Tokens Used
            <div className="rounded-full bg-amber-500/10 p-2 text-amber-500 transition-colors group-hover:bg-amber-500/20">
              <Zap className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {parseInt(globalPremiumTokensUsage || '0').toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 text-xs h-full">
          Global usage across paid tiers
        </CardFooter>
      </Card>

      {/* Free Tokens Card */}
      <Card className="group @container/card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Free Tokens Used
            <div className="rounded-full bg-slate-500/10 p-2 text-slate-500 transition-colors group-hover:bg-slate-500/20">
              <Activity className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {parseInt(globalFreeTokensUsage || '0').toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          Global usage across free tiers
        </CardFooter>
      </Card>
    </div>
  )
}
