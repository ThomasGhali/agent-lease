import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import thomasGhaliPic from '@/public/portofolio-pic-crop2.png'

interface TeamProps {
  imageUrl: string
  name: string
  position: string
  description: string
  socialNetworks: SociaNetworkslProps[]
}

interface SociaNetworkslProps {
  name: string
  url: string
}

const teamList: TeamProps[] = [
  {
    imageUrl: 'https://i.pravatar.cc/150?img=35',
    name: 'Emma Smith',
    position: 'Product Manager',
    description:
      'Guiding the roadmap and ensuring our chatbot customization tools are incredibly easy to use.',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: thomasGhaliPic.src,
    name: 'Thomas Ghali',
    position: 'Founder & Lead Developer',
    description:
      'Architecting the core messaging infrastructure and designing the one-line embed script.',
    socialNetworks: [
      {
        name: 'Github',
        url: 'https://github.com/ThomasGhali',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=36',
    name: 'Ashley Ross',
    position: 'AI/ML Engineer',
    description:
      'Fine-tuning our LLM models and training chatbots to respond intelligently to customer data.',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=17',
    name: 'Bruce Rogers',
    position: 'Backend Engineer',
    description:
      'Optimizing API endpoints, event streams, and database systems for low-latency responses.',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
    ],
  },
]

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <FaLinkedinIn className="h-4 w-4" />

      case 'Facebook':
        return <FaFacebookF className="h-4 w-4" />

      case 'Instagram':
        return <FaInstagram className="h-4 w-4" />

      case 'Github':
        return <FaGithub className="h-4 w-4" />
    }
  }

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text text-transparent">
          Meet the{' '}
        </span>
        Team
      </h2>

      <p className="text-muted-foreground mt-4 mb-10 max-w-3xl text-lg leading-8 md:text-xl">
        The people behind Agent Lease, working to make AI accessible for every
        website owner.
      </p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map(
          ({
            imageUrl,
            name,
            position,
            description,
            socialNetworks,
          }: TeamProps) => (
            <Card
              key={name}
              className="landing-card relative mt-10 flex flex-col items-center justify-center overflow-visible pt-14 text-center"
            >
              <CardHeader className="flex flex-col items-center justify-center pb-2">
                <Avatar className="absolute -top-12 h-24 w-24">
                  <AvatarImage src={imageUrl} alt={`${name} ${position}`} />
                  <AvatarFallback>
                    {name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-center text-xl font-bold text-nowrap">
                  {name}
                </CardTitle>
                <CardDescription className="text-primary text-sm font-semibold text-nowrap">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-muted-foreground px-6 pb-2 text-center text-base">
                <p>{description}</p>
              </CardContent>

              <CardFooter className="justify-center gap-1 border-0 bg-transparent p-0 pb-5">
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className="landing-social-link"
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
