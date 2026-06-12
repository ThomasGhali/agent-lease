import { PriceCardData } from '@/features/shared/pricing/types/pricing-types'
import { PlanType } from '@repo/common'

import {
  Bot,
  Zap,
  Activity,
  Mail,
  TrendingUp,
  Code,
  MessageSquare,
  Infinity as InfinityIcon,
  Sliders,
  Server,
  Puzzle,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

export const plans: PriceCardData[] = [
  {
    planName: 'Starter' as PlanType.FREE,
    planPrice: { type: 'free', monthly: '$0', yearly: '$0' },
    description:
      'Essential tools to start leasing and testing your first AI agents.',
    isPopular: false,
    buttonText: 'Start for free',
    features: [
      {
        content: '2 Active AI Agents',
        icon: <Bot className="h-4 w-4" />,
      },
      {
        content: 'Up to 500 tasks per month',
        icon: <Zap className="h-4 w-4" />,
      },
      {
        content: 'Basic response time monitoring',
        icon: <Activity className="h-4 w-4" />,
      },
      {
        content: 'Standard email support',
        icon: <Mail className="h-4 w-4" />,
      },
    ],
  },
  {
    planName: 'Premium' as PlanType.PREMIUM,
    planPrice: { type: 'paid', monthly: '$10', yearly: '$96' },
    description:
      'Advanced agent management and higher task limits for production usage.',
    isPopular: true,
    buttonText: 'Upgrade to Pro',
    features: [
      {
        content: '10 Active AI Agents',
        icon: <Bot className="h-4 w-4" />,
      },
      {
        content: 'Up to 15,000 tasks per month',
        icon: <Zap className="h-4 w-4" />,
      },
      {
        content: 'Priority analytics & reporting',
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        content: 'Full API & webhook access',
        icon: <Code className="h-4 w-4" />,
      },
      {
        content: 'Priority email & chat support (24h)',
        icon: <MessageSquare className="h-4 w-4" />,
      },
    ],
  },
  {
    planName: 'Enterprise' as PlanType.ENTERPRISE,
    planPrice: { type: 'custom' },
    description:
      'Maximum performance, custom integrations, and SLA-backed support for scale.',
    isPopular: false,
    buttonText: 'Contact Sales',
    features: [
      {
        content: 'Unlimited AI Agents',
        icon: <InfinityIcon className="h-4 w-4" />,
      },
      {
        content: 'Custom monthly task quota',
        icon: <Sliders className="h-4 w-4" />,
      },
      {
        content: 'Dedicated agent hosting & VPC',
        icon: <Server className="h-4 w-4" />,
      },
      {
        content: 'Custom integrations & API development',
        icon: <Puzzle className="h-4 w-4" />,
      },
      {
        content: 'SLA-backed 24/7 dedicated support',
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        content: 'Dedicated Account Manager',
        icon: <UserCheck className="h-4 w-4" />,
      },
    ],
  },
]

export interface FAQProps {
  question: string
  answer: string
  value: string
}

export const FAQList: FAQProps[] = [
  {
    question: 'Is this template free?',
    answer: 'Yes. It is a free ChadcnUI template.',
    value: 'item-1',
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.',
    value: 'item-2',
  },
  {
    question:
      'Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?',
    answer:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?',
    value: 'item-3',
  },
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit?',
    answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    value: 'item-4',
  },
  {
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.',
    value: 'item-5',
  },
]
