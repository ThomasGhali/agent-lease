import { getUserStatsData } from '@/features/user-dashboard/queries'
import {
  AgentsData,
  ConversationsData,
  UserStatsData,
} from '@/features/user-dashboard/types'
import { Shield, Users, Zap } from 'lucide-react'

export const PLAN_STYLES = {
  free: {
    icon: Users,
    color: 'text-zinc-500 dark:text-zinc-400',
    bg: 'bg-zinc-500/10 group-hover:bg-zinc-500/20',
    border: 'border-border',
    text: 'text-foreground',
    gradient: 'from-zinc-500/5',
  },
  premium: {
    icon: Zap,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    border: 'border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]',
    text: 'bg-gradient-to-br from-violet-500 to-fuchsia-500 bg-clip-text text-transparent',
    gradient: 'from-violet-500/10',
  },
  enterprise: {
    icon: Shield,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    border: 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]',
    text: 'bg-gradient-to-br from-emerald-500 to-teal-500 bg-clip-text text-transparent',
    gradient: 'from-emerald-500/10',
  },
}

export const mockConversations: ConversationsData = [
  {
    id: 'room_01',
    agent: { name: 'SupportBot', hostname: 'acme.com' },
    messages: [
      {
        content: 'How do I reset my password?',
        createdAt: new Date('2026-06-26T12:00:00Z'),
      },
    ],
  },
  {
    id: 'room_02',
    agent: { name: 'SalesBot', hostname: 'shop.acme.com' },
    messages: [
      {
        content: 'Do you offer annual billing?',
        createdAt: new Date('2026-06-26T10:30:00Z'),
      },
    ],
  },
  {
    id: 'room_03',
    agent: { name: 'SupportBot', hostname: 'acme.com' },
    messages: [
      {
        content: "My order hasn't arrived yet.",
        createdAt: new Date('2026-06-25T18:45:00Z'),
      },
    ],
  },
  {
    id: 'room_04',
    agent: { name: 'OnboardingBot', hostname: 'app.acme.com' },
    messages: [
      {
        content: 'How do I connect my Slack workspace?',
        createdAt: new Date('2026-06-25T09:10:00Z'),
      },
    ],
  },
  {
    id: 'room_05',
    agent: { name: 'SalesBot', hostname: 'shop.acme.com' },
    messages: [
      {
        content: 'What is your return policy?',
        createdAt: new Date('2026-06-24T10:30:00Z'),
      },
    ],
  },
]

export const mockAgents: AgentsData = [
  {
    name: 'SupportBot',
    agentRole: 'Customer Support',
    isActive: true,
    hostname: 'acme.com',
    _count: { messages: 342 },
  },
  {
    name: 'SalesBot',
    agentRole: 'Sales Assistant',
    isActive: true,
    hostname: 'shop.acme.com',
    _count: { messages: 198 },
  },
  {
    name: 'OnboardingBot',
    agentRole: 'Onboarding Guide',
    isActive: true,
    hostname: 'app.acme.com',
    _count: { messages: 87 },
  },
  {
    name: 'FAQBot',
    agentRole: 'FAQ Assistant',
    isActive: false,
    hostname: 'help.acme.com',
    _count: { messages: 23 },
  },
  {
    name: 'BillingBot',
    agentRole: 'Billing Support',
    isActive: false,
    hostname: 'billing.acme.com',
    _count: { messages: 5 },
  },
]

export const mockUserStatsData: UserStatsData = {
  planLimit: 1750,
  tokensConsumed: 1650,
  userPlan: 'PREMIUM',
  userActiveAgents: 5,
}
