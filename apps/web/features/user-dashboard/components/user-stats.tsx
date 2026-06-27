import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockUserStatsData, PLAN_STYLES } from '@/features/user-dashboard/data'
import { Activity, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getUserStatsData } from '@/features/user-dashboard/queries'

const UserStats = async () => {
  // const stats = mockUserStatsData
  const stats = await getUserStatsData()
  const userPlan = stats?.userPlan?.toLowerCase() || 'free'
  const planStyle =
    PLAN_STYLES[userPlan as keyof typeof PLAN_STYLES] || PLAN_STYLES.free
  const PlanIcon = planStyle.icon

  const usagePercentage = Math.min(
    100,
    Math.round(
      (Number(stats?.tokensConsumed || 0) / Number(stats?.planLimit || 1)) *
        100,
    ),
  )

  // Hue transitions from 142 (emerald green) to 0 (red) starting from 50% usage
  const hue =
    usagePercentage <= 50 ? 142 : 142 - ((usagePercentage - 50) / 50) * 142
  const indicatorColor = `hsl(${Math.round(hue)}, 76%, 40%)`

  return (
    <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6">
      <Card
        className={cn(
          'group to-card dark:bg-card @container/card relative overflow-hidden bg-linear-to-t transition-all duration-300 hover:shadow-md',
          planStyle.border,
          planStyle.gradient,
        )}
      >
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Current Plan
            <div
              className={cn(
                'rounded-full p-2 transition-colors',
                planStyle.bg,
                planStyle.color,
              )}
            >
              <PlanIcon className="size-4" />
            </div>
          </CardDescription>
          <CardTitle
            className={cn(
              'text-3xl font-semibold capitalize tabular-nums @[250px]/card:text-4xl',
              planStyle.text,
            )}
          >
            {userPlan}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          Your active subscription tier
        </CardFooter>
      </Card>

      <Card className="group to-card dark:bg-card border-border @container/card relative overflow-hidden bg-linear-to-t from-blue-500/5 transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Active Agents
            <div className="rounded-full bg-blue-500/10 p-2 text-blue-500 transition-colors group-hover:bg-blue-500/20">
              <Bot className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {stats?.userActiveAgents}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          Currently deployed and running
        </CardFooter>
      </Card>

      <Card className="group from-primary/5 to-card dark:bg-card border-border @container/card relative overflow-hidden bg-linear-to-t transition-all duration-300 hover:shadow-md md:col-span-2">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            Tokens Usage
            <div className="bg-primary/10 text-primary group-hover:bg-primary/20 rounded-full p-2 transition-colors">
              <Activity className="size-4" />
            </div>
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {Number(stats?.tokensConsumed || 0).toLocaleString()}{' '}
            <span className="text-muted-foreground text-sm font-normal">
              / {Number(stats?.planLimit || 0).toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="mt-2 flex h-full flex-col items-start gap-2 text-xs">
          <Progress
            value={usagePercentage}
            className="h-2 w-full transition-all duration-1000 ease-out"
            style={
              { '--indicator-color': indicatorColor } as React.CSSProperties
            }
            indicatorClassName="bg-[var(--indicator-color)] transition-colors duration-500"
          />
          <span
            className={cn(
              'text-muted-foreground',
              usagePercentage > 90 &&
                'font-medium text-red-500 dark:text-red-400',
            )}
          >
            <strong className="text-foreground">{usagePercentage}%</strong> of
            your {userPlan} plan limit used
          </span>
        </CardFooter>
      </Card>
    </section>
  )
}

export const UserStatsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6">
      {/* Current Plan Card Skeleton */}
      <Card className="border-border bg-card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            <span className="bg-muted h-4 w-24 animate-pulse rounded-md" />
            <span className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          </CardDescription>
          <CardTitle className="text-3xl font-semibold">
            <span className="bg-muted inline-block h-9 w-28 animate-pulse rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          <span className="bg-muted/60 inline-block h-4 w-40 animate-pulse rounded-md" />
        </CardFooter>
      </Card>

      {/* Active Agents Card Skeleton */}
      <Card className="border-border bg-card relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            <span className="bg-muted h-4 w-24 animate-pulse rounded-md" />
            <span className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          </CardDescription>
          <CardTitle className="text-3xl font-semibold">
            <span className="bg-muted inline-block h-9 w-12 animate-pulse rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-muted-foreground mt-2 h-full text-xs">
          <span className="bg-muted/60 inline-block h-4 w-44 animate-pulse rounded-md" />
        </CardFooter>
      </Card>

      {/* Tokens Usage Card Skeleton */}
      <Card className="border-border bg-card relative overflow-hidden md:col-span-2">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between font-medium">
            <span className="bg-muted h-4 w-24 animate-pulse rounded-md" />
            <span className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          </CardDescription>
          <CardTitle className="text-3xl font-semibold">
            <span className="bg-muted inline-block h-9 w-48 animate-pulse rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="mt-2 flex h-full flex-col items-start gap-2 text-xs">
          <span className="bg-muted h-2 w-full animate-pulse rounded" />
          <span className="bg-muted/60 inline-block h-4 w-52 animate-pulse rounded-md" />
        </CardFooter>
      </Card>
    </section>
  )
}

export default UserStats
