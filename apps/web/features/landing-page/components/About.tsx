import { Statistics } from './Statistics'
import pilot from '@/features/landing-page/assets/pilot.png'
import Image from 'next/image'

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/40 rounded-lg border py-10 md:py-12">
        <div className="flex flex-col-reverse items-center gap-8 px-6 md:flex-row md:items-stretch md:gap-12 md:px-10">
          <Image
            src={pilot}
            alt=""
            className="w-full max-w-[300px] rounded-lg object-contain md:self-center"
          />
          <div className="flex min-w-0 flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{' '}
                </span>
                Agent Lease
              </h2>
              <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-8 md:text-xl">
                Agent Lease is a micro-SaaS that lets you deploy customizable AI
                chatbot agents on any website. Sign up, customize your agent in
                the dashboard, and paste a single line of code into your site.
                A chat bubble appears instantly, letting your visitors interact
                with your personalized AI assistant 24/7.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
