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
import thomasGhaliPic from '@/public/portofolio-pic3-crop.png'

export const HeroCards = () => {
  return (
    <div className="relative h-[570px] w-[720px] flex-row flex-wrap justify-center gap-8 xl:flex">
      <Card className="landing-card -mt-15 h-min w-[340px] self-start">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-11 w-11">
            <AvatarImage alt="" src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Sarah Chen</CardTitle>
            <CardDescription className="text-sm">
              @sarahchen_dev
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-[0.95rem]">
          Agent Lease cut our support tickets by 40% in the first week!
        </CardContent>
      </Card>

      <Card className="landing-card flex h-min w-[320px] flex-col items-center justify-center overflow-visible pt-14 text-center">
        <CardHeader className="flex flex-col items-center justify-center pb-1">
          <Avatar className="absolute -top-11 h-24 w-24">
            <AvatarImage alt="Thomas Ghali" src={thomasGhaliPic.src} />
            <AvatarFallback>TG</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-nowrap">
            Thomas Ghali
          </CardTitle>
          <CardDescription className="text-primary text-sm font-normal text-nowrap">
            Founder & Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="text-muted-foreground max-w-[250px] px-6 pb-2 text-center text-sm">
          <p>
            Building tools that let businesses deploy AI agents effortlessly
          </p>
        </CardContent>

        <CardFooter className="justify-center gap-1 border-0 bg-transparent p-0 pb-5">
          <div className="flex items-center justify-center gap-1">
            <a
              rel="noreferrer noopener"
              href="https://github.com/ThomasGhali"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">Github icon</span>
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">X icon</span>
              <FaXTwitter className="h-4 w-4" />
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com"
              target="_blank"
              className="landing-social-link"
            >
              <span className="sr-only">LinkedIn icon</span>
              <FaLinkedinIn className="h-4 w-4" />
            </a>
          </div>
        </CardFooter>
      </Card>

      <Card className="landing-card -mt-72 h-min w-[320px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            Free
            <Badge
              variant="secondary"
              className="text-primary/90 px-3! text-xs font-semibold!"
            >
              No Credit Card Required
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Get started with your first AI chatbot agent, completely free.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button size="lg" className="w-full">
            Get started for free
          </Button>
        </CardContent>

        <hr className="m-auto mb-4 w-4/5" />

        <CardFooter className="flex">
          <div className="space-y-4 text-sm">
            {['2 AI Agents', '500 tasks/month', 'Basic analytics'].map(
              (benefit: string) => (
                <span key={benefit} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500" />{' '}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ),
            )}
          </div>
        </CardFooter>
      </Card>

      <Card className="landing-card -mt-22 h-min w-[310px]">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="bg-primary/15 text-primary mt-1 rounded-lg p-2">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle className="text-lg">One-Line Embed</CardTitle>
            <CardDescription className="mt-2 text-base">
              Paste a single script tag and your AI chat bubble appears
              instantly on any website.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
