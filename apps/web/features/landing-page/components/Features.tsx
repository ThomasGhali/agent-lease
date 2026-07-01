import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import analyticsImage from '@/public/analytics.png'
import customizeAgentsImage from '@/public/cutomiseagents.png'
import oneLineCodeImage from '@/public/onelinecode.png'
import { Badge } from '@/components/ui/badge'
import Image, { type StaticImageData } from 'next/image'

interface FeatureProps {
  title: string
  description: string
  image: StaticImageData
  imageClassName?: string
}

const features: FeatureProps[] = [
  {
    title: 'One-Line Embed',
    description:
      'Paste a single script tag into your website and a fully functional AI chat bubble appears instantly. No complex setup required.',
    image: oneLineCodeImage,
  },
  {
    title: 'Custom Agent Training',
    description:
      'Train your chatbot with your own data, brand voice, and business rules from an intuitive dashboard. Your agent, your way.',
    image: customizeAgentsImage,
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Monitor every conversation, track visitor engagement, and gain actionable insights to improve your customer experience.',
    image: analyticsImage,
    imageClassName: 'h-[190px]',
  },
]
// w-full max-w-[220px] object-contain lg:max-w-[280px]
const featureList: string[] = [
  'One-Line Setup',
  'Custom Branding',
  'Multi-Agent Support',
  'Conversation Logs',
  'Visitor Analytics',
  'Webhook Integrations',
  'Dark/Light Widget',
  'API Access',
  '24/7 Availability',
]

export const Features = () => {
  return (
    <section id="features" className="container space-y-8 py-24 sm:py-32">
      <h2 className="text-3xl font-bold md:text-center lg:text-4xl">
        Many{' '}
        <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text text-transparent">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap gap-4 md:justify-center">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map(
          ({
            title,
            description,
            image,
            imageClassName: itemImageClassName,
          }: FeatureProps) => (
            <Card key={title} className="landing-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-foreground/90 text-base">
                {description}
              </CardContent>

              <CardFooter className="border-0 bg-transparent pt-0">
                <Image
                  src={image}
                  alt="About feature"
                  className={`mx-auto w-full max-w-[220px] object-contain lg:max-w-[280px] dark:invert-92 ${
                    itemImageClassName || ''
                  }`}
                />
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
