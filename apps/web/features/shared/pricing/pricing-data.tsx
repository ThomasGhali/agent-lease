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
    buttonText: 'Upgrade to Premium',
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
    question: 'How does the one-line embed work?',
    answer:
      'After creating and customizing your agent in the dashboard, you\'ll receive a single <script> tag. Paste it into your website\'s HTML (before the closing </body> tag), and a chat bubble will appear automatically for your visitors.',
    value: 'item-1',
  },
  {
    question: 'Can I customize how the chatbot looks and behaves?',
    answer:
      'Absolutely. You can configure the chatbot\'s name, avatar, personality, conversation tone, knowledge base, and widget appearance (colors, position, welcome message) — all from the dashboard.',
    value: 'item-2',
  },
  {
    question: 'What websites does Agent Lease work with?',
    answer:
      'Agent Lease works with any website that supports HTML — WordPress, Shopify, Squarespace, Wix, Next.js, static HTML, and more. If you can add a script tag, you can use Agent Lease.',
    value: 'item-3',
  },
  {
    question: 'Is there a free plan available?',
    answer:
      'Yes! Our Starter plan is completely free and includes 2 active AI agents with up to 500 tasks per month. It\'s perfect for testing and small projects.',
    value: 'item-4',
  },
  {
    question: 'How is my data and my visitors\' data handled?',
    answer:
      'We take security seriously. All conversations are encrypted in transit and at rest. We never sell your data or your visitors\' data. Enterprise plans include dedicated hosting and VPC options for maximum security.',
    value: 'item-5',
  },
]
