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
    title: 'Code Collaboration',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <ChartIcon />,
  },
  {
    title: 'Project Management',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <WalletIcon />,
  },
  {
    title: 'Task Automation',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <MagnifierIcon />,
  },
]

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid place-items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        <div className="w-full">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="text-primary">
              Client-Centric{' '}
            </span>
            Services
          </h2>

          <p className="text-muted-foreground mt-4 mb-8 max-w-2xl text-lg leading-8 md:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </p>

          <div className="flex flex-col gap-6">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title} className="landing-card">
                <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                  <div className="bg-primary/15 text-primary mt-1 rounded-lg p-2">
                    {icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{title}</CardTitle>
                    <CardDescription className="mt-2 text-base">
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
