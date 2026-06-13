'use client'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { HeroCards } from './HeroCards'
import { FaGithub } from 'react-icons/fa6'

export const Hero = () => {
  return (
    <section className="container relative isolate grid min-h-[calc(100svh-4rem)] justify-items-end! justify-center items-center gap-10 overflow-visible py-16 md:py-24 xl:grid-cols-[minmax(0,0.9fr)_minmax(720px,1fr)] xl:py-28">
      <div
        className="shadow pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl space-y-6 xl:text-start">
        <main className="text-5xl leading-[1.08] font-bold tracking-normal text-balance md:text-6xl">
          <h1 className="inline">
            <span className="landing-word-shadcn inline">Shadcn</span> landing
            page
          </h1>{' '}
          for{' '}
          <h2 className="inline">
            <span className="landing-word-react inline">React</span> developers
          </h2>
        </main>

        <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-8 xl:mx-0">
          Build your React landing page effortlessly with the required sections
          to your project.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center xl:justify-start">
          <Button size="lg" className="w-full sm:w-auto sm:min-w-40">
            Get Started
          </Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`landing-cta-button w-full sm:w-auto sm:min-w-48 ${buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              },
            )}`}
          >
            Github Repository
            <FaGithub className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="z-10 hidden xl:block">
        <HeroCards />
      </div>
    </section>
  )
}
