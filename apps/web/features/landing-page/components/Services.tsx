import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MagnifierIcon, WalletIcon, ChartIcon } from './Icons'
import type { ReactElement } from 'react'
import cubeLegImg from '@/features/landing-page/assets/cube-leg.png'
import Image from 'next/image'

interface ServiceProps {
  title: string
  description: string
  icon: ReactElement
}

const serviceList: ServiceProps[] = [
  {
    title: 'Agent Customization Studio',
    description:
      'Design your chatbot\'s personality, tone, and knowledge base. Upload documents, set conversation rules, and preview in real time.',
    icon: <ChartIcon />,
  },
  {
    title: 'Conversation Analytics',
    description:
      'Track every visitor interaction with detailed analytics. Monitor response quality, engagement rates, and common questions.',
    icon: <WalletIcon />,
  },
  {
    title: 'Seamless Integration',
    description:
      'One script tag is all it takes. Works with any website — WordPress, Shopify, Next.js, static HTML, and more.',
    icon: <MagnifierIcon />,
  },
]

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid place-items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Everything You Need{' '}
            </span>
            To Deploy AI
          </h2>

          <p className="text-xl text-muted-foreground mt-4 mb-8 max-w-2xl leading-8">
            Powerful tools to create, manage, and optimize your AI chatbot
            agents — all from one platform.
          </p>

          <div className="flex flex-col gap-6">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title} className="landing-card">
                <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                  <div className="bg-primary/15 text-primary mt-1 rounded-lg p-2">
                    {icon}
                  </div>
                  <div>
                    <CardTitle className='text-2xl'>{title}</CardTitle>
                    <CardDescription className="mt-2 text-base text-muted-foreground">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLegImg}
          className="w-full max-w-[300px] object-contain md:max-w-[500px] lg:max-w-[600px]"
          alt="About services"
        />
      </div>
    </section>
  )
}
