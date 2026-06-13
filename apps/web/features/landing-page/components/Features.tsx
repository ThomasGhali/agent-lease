import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import image from '@/features/landing-page/assets/growth.png'
import image3 from '@/features/landing-page/assets/reflecting.png'
import image4 from '@/features/landing-page/assets/looking-ahead.png'
import { Badge } from '@/components/ui/badge'
import Image, { type StaticImageData } from 'next/image'

interface FeatureProps {
  title: string
  description: string
  image: StaticImageData
}

const features: FeatureProps[] = [
  {
    title: 'One-Line Embed',
    description:
      'Paste a single script tag into your website and a fully functional AI chat bubble appears instantly. No complex setup required.',
    image: image4,
  },
  {
    title: 'Custom Agent Training',
    description:
      'Train your chatbot with your own data, brand voice, and business rules from an intuitive dashboard. Your agent, your way.',
    image: image3,
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Monitor every conversation, track visitor engagement, and gain actionable insights to improve your customer experience.',
    image,
  },
]

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
      <h2 className="text-3xl md:text-center lg:text-4xl font-bold">
        Many{' '}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
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
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title} className="landing-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground text-base">
              {description}
            </CardContent>

            <CardFooter className="border-0 bg-transparent pt-0">
              <Image
                src={image}
                alt="About feature"
                className="mx-auto w-full max-w-[220px] object-contain lg:max-w-[280px]"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
