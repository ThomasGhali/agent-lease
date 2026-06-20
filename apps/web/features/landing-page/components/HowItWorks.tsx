import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from './Icons'
import type { ReactElement } from 'react'

interface FeatureProps {
  icon: ReactElement
  title: string
  description: string
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Sign Up',
    description:
      'Create your account in seconds and choose a plan that fits your needs — start free, upgrade anytime.',
  },
  {
    icon: <MapIcon />,
    title: 'Customize Your Agent',
    description:
      "Configure your AI chatbot's personality, knowledge base, and appearance from an intuitive dashboard.",
  },
  {
    icon: <PlaneIcon />,
    title: 'Embed in One Line',
    description:
      "Copy a single script tag from the setup page and paste it into your website's HTML. That's it.",
  },
  {
    icon: <GiftIcon />,
    title: 'Engage Visitors',
    description:
      'A chat bubble appears on your site instantly. Visitors can talk to your custom AI agent 24/7.',
  },
]

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container py-24 text-center sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        How It Works Step-by-Step Guide
      </h2>
      <p className="text-foreground/90 mx-auto mt-4 mb-8 max-w-3xl text-xl leading-8">
        From sign-up to a live chatbot on your website in{' '}
        <span className="text-primary">
          under 5 minutes, and no coding experience needed!
        </span>
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="landing-card">
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/90 text-base">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
