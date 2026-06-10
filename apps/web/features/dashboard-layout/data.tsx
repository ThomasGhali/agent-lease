import {
  BookOpenIcon,
  BotIcon,
  DatabaseIcon,
  GalleryVerticalEndIcon,
  Plus,
  Settings2Icon,
  TerminalSquareIcon,
} from 'lucide-react'

import { DashboardData } from '@/features/dashboard-layout/types'

export const data: DashboardData = {
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
      title: 'Control',
      role: 'user',
      options: [
        {
          name: 'Create an Agent',
          url: '/dashboard/my-agents/create',
          icon: <Plus />,
        },
        {
          name: 'Settings',
          url: '#',
          icon: <Settings2Icon />,
        },
      ],
    },
    {
      title: 'Admin',
      role: 'admin',
      options: [
        {
          name: 'Data',
          url: '/dashboard/admin/data',
          icon: <DatabaseIcon />,
        },
      ],
    },
  ],
}
