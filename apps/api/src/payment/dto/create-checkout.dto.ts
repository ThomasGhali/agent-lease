import { IsEnum } from 'class-validator';

export enum PlanType {
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export class CreateCheckoutDto {
  @IsEnum(PlanType)
  plan: PlanType;
}
