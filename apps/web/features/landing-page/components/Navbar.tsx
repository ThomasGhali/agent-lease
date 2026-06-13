'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Menu } from 'lucide-react'
import { ModeToggle } from '@/features/landing-page/components/mode-toggle'
import { LogoIcon } from '@/features/landing-page/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa6'
import Link from 'next/link'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  { href: '#features', label: 'Features' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className="bg-background/90 supports-backdrop-filter:bg-background/75 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 font-bold">
          <Link
            href="/"
            className="flex min-w-0 items-center text-lg font-bold tracking-normal sm:text-xl"
          >
            <LogoIcon />
            <span className="truncate">ShadcnUI/React</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ModeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="hover:bg-muted flex size-9 items-center justify-center rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu Icon</span>
              </button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center text-xl font-bold">
                  <LogoIcon />
                  Shadcn/React
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col items-stretch gap-2">
                {routeList.map(({ href, label }: RouteProps) => (
                  <a
                    rel="noreferrer noopener"
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'default',
                    })}
                  >
                    {label}
                  </a>
                ))}
                <a
                  rel="noreferrer noopener"
                  href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                  target="_blank"
                  className={`mt-2 border ${buttonVariants({
                    variant: 'secondary',
                    size: 'default',
                  })}`}
                >
                  <FaGithub className="mr-2 h-5 w-5" />
                  Github
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {routeList.map((route: RouteProps, i) => (
            <a
              rel="noreferrer noopener"
              href={route.href}
              key={i}
              className={`text-sm ${buttonVariants({
                variant: 'ghost',
                size: 'default',
              })}`}
            >
              {route.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`border ${buttonVariants({
              variant: 'secondary',
              size: 'default',
            })}`}
          >
            <FaGithub className="mr-2 h-5 w-5" />
            Github
          </a>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
