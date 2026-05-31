import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookCasesProcessorService } from './webhook-cases-processor.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookCasesProcessorService],
})
export class WebhookModule {}
