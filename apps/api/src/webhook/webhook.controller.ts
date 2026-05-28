import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  type RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { WebhookService } from 'src/webhook/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService){};

  @Post('/')
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody)
      throw new BadRequestException('Raw body of the request is missing.');

    return this.webhookService.handleStripeWebhook(req.rawBody, signature);
  }
}
