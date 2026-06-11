import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface TestimonialProps {
  image: string
  name: string
  userName: string
  comment: string
}

const testimonials: TestimonialProps[] = [
  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe',
    comment: 'This landing page is awesome!',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe1',
    comment:
      'Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
  },

  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe2',
    comment:
      'Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe3',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe4',
    comment:
      'Lorem ipsum dolor sit amet, tempor incididunt  aliqua. Ut enim ad minim veniam, quis nostrud.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'John Doe React',
    userName: '@john_Doe5',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <h2 className="max-w-4xl text-3xl font-bold md:text-4xl">
        Discover Why
        <span className="text-primary">
          {' '}
          People Love{' '}
        </span>
        This Landing Page
      </h2>

      <p className="text-muted-foreground max-w-3xl pt-4 pb-8 text-lg leading-8 md:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error
        facere hic reiciendis illo
      </p>

      <div className="mx-auto columns-1 gap-6 space-y-4 sm:columns-2 lg:columns-3 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="mb-4 break-inside-avoid overflow-hidden lg:mb-6"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
