'use client'

import { Check } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  FAQList,
  FAQProps,
  plans,
} from '@/features/shared/pricing/pricing-data'
import { JSX, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PaidPlanType, PlanType } from '@repo/common'
import { createAuthClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { PriceCardProps } from '@/features/shared/pricing/types/pricing-types'
import { PriceCard } from '@/features/shared/pricing/components/pricing-card'
import { PricingFaqs } from '@/features/shared/pricing/components/pricing-faqs'

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="bg-background relative min-h-screen overflow-hidden px-6 py-12 md:py-24 lg:px-8">
      {/* Decorative background grid and blurs */}
      <div className="bg-background absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Simple, transparent <span className="text-primary">pricing</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Choose the plan that fits your workflow. Scale up seamlessly as your
            autonomous agent fleet grows.
          </p>

          {/* Toggle */}
          <div className="mt-10 flex justify-center">
            <div className="bg-muted/60 ring-border relative flex rounded-full p-1 ring-1">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`relative cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  !isAnnual
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isAnnual
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>Annually</span>
                <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <PriceCard
              key={idx}
              planName={plan.planName}
              planPrice={plan.planPrice}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              buttonText={plan.buttonText}
              isAnnual={isAnnual}
            />
          ))}
        </div>

        <PricingFaqs />
      </div>
    </div>
  )
}
