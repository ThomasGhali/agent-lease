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

// TODO: change those limit to higher numbers after documentation is done
export const PLAN_LIMITS: Record<PlanType, PlanConfig> = {
  [PlanType.FREE]: {
    tokensLimit: 500,
    agentsLimit: 1,
  },
  [PlanType.PREMIUM]: {
    tokensLimit: 3000,
    agentsLimit: 3,
  },
  [PlanType.ENTERPRISE]: {
    tokensLimit: 8_000_000,
    agentsLimit: 10,
  },
}
