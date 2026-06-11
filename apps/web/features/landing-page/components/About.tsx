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
              <h2 className="text-3xl font-bold md:text-4xl">
                <span className="text-primary">
                  About{' '}
                </span>
                Company
              </h2>
              <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-8 md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
