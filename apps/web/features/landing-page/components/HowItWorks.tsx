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
    title: "Accessibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="text-primary">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 mb-8 max-w-3xl text-lg leading-8 md:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="landing-card"
          >
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4 text-lg font-bold">
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
