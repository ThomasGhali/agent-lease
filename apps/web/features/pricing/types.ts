import { ReactNode } from 'react'
import { PlanType } from '@repo/common'

export interface PriceCardProps {
  styles?: string
  planName: PlanType
  planPrice: PlanPrice
  description: string
  features: Feature[]
  isPopular?: boolean
  buttonText?: string
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
