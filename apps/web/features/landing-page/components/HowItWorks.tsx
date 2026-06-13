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
    title: "Sign Up",
    description:
      "Create your account in seconds and choose a plan that fits your needs — start free, upgrade anytime.",
  },
  {
    icon: <MapIcon />,
    title: "Customize Your Agent",
    description:
      "Configure your AI chatbot's personality, knowledge base, and appearance from an intuitive dashboard.",
  },
  {
    icon: <PlaneIcon />,
    title: "Embed in One Line",
    description:
      "Copy a single script tag from the setup page and paste it into your website's HTML. That's it.",
  },
  {
    icon: <GiftIcon />,
    title: "Engage Visitors",
    description:
      "A chat bubble appears on your site instantly. Visitors can talk to your custom AI agent 24/7.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        How It{" "}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="text-xl text-muted-foreground mx-auto mt-4 mb-8 max-w-3xl leading-8">
        From sign-up to a live chatbot on your website in under 5 minutes.
        No coding experience needed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="landing-card"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-base">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
