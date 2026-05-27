'use client'

import { useState } from 'react'
import PriceCard from './price-card'
import { HelpCircle } from 'lucide-react'
import { faqs, plans } from '@/features/pricing/data'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="bg-background relative min-h-screen overflow-hidden px-6 py-12 md:py-24 lg:px-8">
      {/* Decorative background grid and blurs */}
      <div className="bg-background absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Simple, transparent pricing
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

        {/* FAQ Section */}
        <div className="border-border/80 mx-auto mt-24 max-w-4xl border-t pt-16">
          <div className="text-center">
            <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 text-sm">
              Have questions about billing, limits, or enterprise options?
              We&apos;re here to help.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="flex gap-4">
                <div className="bg-muted text-muted-foreground mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <dt className="text-foreground text-sm font-semibold">
                    {faq.question}
                  </dt>
                  <dd className="text-muted-foreground mt-2 text-sm">
                    {faq.answer}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
