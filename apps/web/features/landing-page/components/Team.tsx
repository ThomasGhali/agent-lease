import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TeamProps {
  imageUrl: string
  name: string
  position: string
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
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=60',
    name: 'John Doe',
    position: 'Tech Lead',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=36',
    name: 'Ashley Ross',
    position: 'Frontend Developer',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
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
    position: 'Backend Developer',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
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
    }
  }

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{' '}
        </span>
        Crew
      </h2>

      <p className="text-muted-foreground mt-4 mb-10 max-w-3xl text-lg leading-8 md:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
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
                <CardDescription className="text-primary text-nowrap text-sm font-semibold">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-muted-foreground px-6 pb-2 text-center text-base">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
