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
    name: 'Sarah Chen',
    userName: '@sarahchen_dev',
    comment: 'Agent Lease cut our support tickets by 40% in the first week. The one-line setup was literally copy-paste.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Marcus Rivera',
    userName: '@marcusrivera',
    comment:
      'I was skeptical about adding a chatbot to our e-commerce store, but the customization options are incredible. Our customers love the instant responses.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Emily Park',
    userName: '@emilypark_ux',
    comment:
      'The analytics dashboard alone is worth the subscription. We can see exactly what questions our visitors are asking and optimize our content accordingly.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'James Wilson',
    userName: '@jameswilson',
    comment:
      'We went from zero chatbot to a fully trained AI agent answering customer questions in under 10 minutes. The onboarding experience is flawless.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Priya Sharma',
    userName: '@priyasharma_io',
    comment:
      'As a freelancer, I embed Agent Lease on every client site I build. It\'s become my secret weapon for delivering extra value.',
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'David Kim',
    userName: '@davidkim_saas',
    comment:
      'The API access on the Pro plan lets us integrate agent data directly into our CRM. Game changer for our sales team.',
  },
]

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <h2 className="max-w-4xl text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {' '}
          Teams Love{' '}
        </span>
        Agent Lease
      </h2>

      <p className="text-muted-foreground max-w-3xl pt-4 pb-8 text-lg leading-8 md:text-xl">
        Join hundreds of businesses using Agent Lease to deliver instant,
        intelligent support to their website visitors.
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
