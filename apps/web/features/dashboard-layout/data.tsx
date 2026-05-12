import {
  BookOpenIcon,
  BotIcon,
  GalleryVerticalEndIcon,
  Settings2Icon,
  TerminalSquareIcon,
} from 'lucide-react'

import { DashboardData } from '@/features/dashboard-layout/types'

export const data: DashboardData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  team: {
    name: 'Acme Inc',
    logo: <GalleryVerticalEndIcon />,
    plan: 'Enterprise',
  },
  navMain: [
    {
      title: 'My Agents',
      url: '/dashboard/my-agents',
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [],
    },
    {
      title: 'Models',
      url: '#',
      icon: <BotIcon />,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: <BookOpenIcon />,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Settings',
      url: '#',
      icon: <Settings2Icon />,
    },
    // ...
  ],
}
