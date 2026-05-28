import { Check } from 'lucide-react'
import { PriceCardProps } from '@/features/pricing/types'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlanType } from '@repo/common'
import { createAuthClient } from '@/lib/supabase/client'

const PriceCard = ({
  styles,
  planName,
  planPrice,
  description,
  features,
  isPopular = false,
  buttonText = 'Get Started',
  isAnnual,
}: PriceCardProps) => {
  const handleButtonClick = async (planName: PlanType) => {
    if (planName !== PlanType.PREMIUM)
      return console.error('Invalid plan, please choose premium')

    const supabase = createAuthClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // TODO: redirect to login
      return console.error('You must be logged in to subscribe')
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan: planName }),
      },
    )

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <Card
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300',
        isPopular
          ? 'border-primary from-background to-muted/20 shadow-primary/5 ring-primary/30 bg-linear-to-b shadow-xl ring-1 dark:from-zinc-900/40 dark:to-zinc-950/20'
          : 'border-border bg-card hover:border-foreground/20 shadow-sm hover:-translate-y-1 hover:shadow-md',
        styles,
      )}
    >
      <div>
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground text-xl font-bold tracking-tight">
              {planName}
            </CardTitle>
            {isPopular && (
              <span className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">
                Popular
              </span>
            )}
          </div>
          <CardDescription className="text-muted-foreground mt-2 min-h-10 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <div className="text-foreground my-4 flex items-baseline">
            {planPrice.type === 'custom' ? (
              <span className="text-4xl font-extrabold tracking-tight">
                Custom
              </span>
            ) : (
              <>
                <span className="text-4xl font-extrabold tracking-tight">
                  {isAnnual ? planPrice.yearly : planPrice.monthly}
                </span>

                <span className="text-muted-foreground ml-1 text-sm font-medium">
                  {isAnnual ? '/ year' : '/ month'}
                </span>
              </>
            )}
          </div>

          <div className="border-border/60 space-y-4 border-t pt-4">
            <span className="text-foreground mb-2 inline-block text-xs font-semibold tracking-wider uppercase">
              What&apos;s included
            </span>
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    {feature.icon ? (
                      feature.icon
                    ) : (
                      <Check className="h-3 w-3 stroke-3" />
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {feature.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </div>

      <CardFooter className="border-t-0 bg-transparent p-6 pt-0">
        <Button
          onClick={() => handleButtonClick(planName)}
          variant={isPopular ? 'default' : 'outline'}
          className={cn(
            'w-full cursor-pointer py-5 text-sm font-semibold transition-all duration-200',
            isPopular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01]'
              : 'hover:bg-accent hover:text-accent-foreground',
          )}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PriceCard
