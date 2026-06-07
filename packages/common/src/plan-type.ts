export enum PlanType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}
export enum PaidPlanType {
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export interface PlanConfig {
  tokensLimit: number
  agentsLimit: number
}

export const PLAN_LIMITS: Record<PlanType, PlanConfig> = {
  [PlanType.FREE]: {
    tokensLimit: 100_000,
    agentsLimit: 1,
  },
  [PlanType.PREMIUM]: {
    tokensLimit: 3_000_000,
    agentsLimit: 3,
  },
  [PlanType.ENTERPRISE]: {
    tokensLimit: 8_000_000,
    agentsLimit: 10,
  },
}
