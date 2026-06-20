'use client'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { HeroCards } from './HeroCards'

export const Hero = () => {
  return (
    <section className="relative isolate container grid items-center justify-between gap-10 overflow-visible py-24 md:py-32 xl:grid-cols-[minmax(0,0.9fr)_minmax(720px,1fr)] xl:py-40">
      <div className="pointer-events-none shadow" aria-hidden="true" />

      <div className="max-w-3xl space-y-6 xl:text-start">
        <main className="text-5xl leading-[1.08] font-bold tracking-normal text-balance max-xl:text-center md:text-6xl">
          <span className="landing-word-shadcn inline">AI Chatbot</span> for
          your website in{' '}
          <span className="landing-word-react inline">one line</span> of code
        </main>

        <p className="text-foreground/90 mx-auto max-w-2xl text-xl leading-8 xl:mx-0">
          Lease a customizable AI agent, paste one script into your site, and
          let visitors chat with your personalized chatbot instantly.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center xl:justify-start">
          <Button size="lg" className="w-full sm:w-auto sm:min-w-40">
            Start Free Trial
          </Button>

          <a
            rel="noreferrer noopener"
            href="#howItWorks"
            className={`landing-cta-button w-full sm:w-auto sm:min-w-48 ${buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              },
            )}`}
          >
            See How It Works
          </a>
        </div>
      </div>

      <div className="hidden xl:block">
        <HeroCards />
      </div>
    </section>
  )
}
