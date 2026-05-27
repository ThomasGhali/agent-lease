import { ReactNode } from 'react'

export interface PriceCardProps {
  styles?: string
  planName: string
  planPrice: PlanPrice
  description: string
  features: Feature[]
  isPopular?: boolean
  buttonText?: string
  onButtonClick?: () => void
  isAnnual: boolean
}

export type PriceCardData = Omit<PriceCardProps, 'isAnnual'>

type Feature = {
  content: string
  icon?: ReactNode
}

type PlanPrice =
  | { type: 'free'; monthly: '$0'; yearly: '$0' }
  | { type: 'custom' }
  | {
      type: 'paid'
      monthly: string
      yearly: string
    }
