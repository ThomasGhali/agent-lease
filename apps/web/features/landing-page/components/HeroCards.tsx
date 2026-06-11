import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { LightBulbIcon } from './Icons'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'

export const HeroCards = () => {
  return (
    <div className="relative h-[570px] w-[720px] flex-row flex-wrap gap-8 xl:flex">
      <Card className="landing-card absolute top-8 left-0 w-[340px]">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-11 w-11">
            <AvatarImage alt="" src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">
              John Doe React
            </CardTitle>
            <CardDescription className="text-sm">@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-[0.95rem]">
          This landing page is awesome!
        </CardContent>
      </Card>

      <Card className="landing-card absolute top-12 right-0 flex w-[320px] flex-col items-center justify-center overflow-visible pt-14 text-center">
        <CardHeader className="flex items-center justify-center pb-1">
          <Avatar className="border-card absolute -top-11 h-24 w-24 border-4">
            <AvatarImage
              alt="Leo Miranda"
              src="https://i.pravatar.cc/150?img=58"
            />
            <AvatarFallback>LM</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold">Leo Miranda</CardTitle>
          <CardDescription className="text-primary text-sm font-semibold">
            Frontend Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="max-w-[250px] px-6 pb-2 text-center text-sm text-muted-foreground">
          <p>
            I really enjoy transforming ideas into functional software that
            exceeds expectations
          </p>
        </CardContent>

        <CardFooter className="justify-center gap-1 border-0 bg-transparent p-0 pb-5">
          <div className="flex items-center justify-center gap-1">
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">Github icon</span>
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">X icon</span>
              <FaXTwitter className="h-4 w-4" />
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/leopoldo-miranda/"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">LinkedIn icon</span>
              <FaLinkedinIn className="h-4 w-4" />
            </a>
          </div>
        </CardFooter>
      </Card>

      <Card className="landing-card absolute top-[285px] left-12 w-[320px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            Free
            <Badge variant="secondary" className="text-primary text-xs">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button size="lg" className="w-full">
            Start Free Trial
          </Button>
        </CardContent>

        <hr className="m-auto mb-4 w-4/5" />

        <CardFooter className="flex">
          <div className="space-y-4 text-sm">
            {['4 Team member', '4 GB Storage', 'Upto 6 pages'].map(
              (benefit: string) => (
                <span key={benefit} className="flex items-center">
                  <Check className="text-primary h-4 w-4" />{' '}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ),
            )}
          </div>
        </CardFooter>
      </Card>

      <Card className="landing-card absolute right-0 bottom-[78px] w-[310px]">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="bg-primary/15 text-primary mt-1 rounded-lg p-2">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">
              Light & dark mode
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
