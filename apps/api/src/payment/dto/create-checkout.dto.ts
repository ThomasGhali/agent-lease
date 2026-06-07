import { PaidPlanType } from '@repo/common';
import { IsEnum } from 'class-validator';

export class CreateCheckoutDto {
  @IsEnum(PaidPlanType)
  plan!: PaidPlanType;
}
