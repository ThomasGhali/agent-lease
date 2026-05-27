import type { PriceCardData } from '@/features/pricing/types'

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
    planName: 'Starter',
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
    planName: 'Pro',
    planPrice: { type: 'paid', monthly: '$39', yearly: '$374' },
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
    planName: 'Enterprise',
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

export const faqs = [
  {
    question: 'How do monthly task limits work?',
    answer:
      "Every time an agent executes an action (e.g., replying to a customer, making an API call, running a search), it counts as a task. If you reach your limit, we'll notify you so you can upgrade. Tasks do not roll over to the next month.",
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer:
      'Yes, you can easily change your subscription from your dashboard. Upgrades are applied immediately on a pro-rated basis, while downgrades take effect at the start of your next billing cycle.',
  },
  {
    question: 'Do you offer custom model integration?',
    answer:
      'Yes! Our Enterprise plan allows you to bring your own models (e.g., custom fine-tuned GPTs, Claude, or open-source LLMs hosted in your infrastructure) and connect them seamlessly with the platform.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is our top priority. We use enterprise-grade encryption for all agent configurations and credentials. Data transmitted through our API is encrypted in transit and at rest.',
  },
]
