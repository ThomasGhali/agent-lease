import { PlanType } from '@repo/common';
import { IsEnum } from 'class-validator';

export class CreateCheckoutDto {
  @IsEnum(PlanType)
  plan: PlanType;
}
