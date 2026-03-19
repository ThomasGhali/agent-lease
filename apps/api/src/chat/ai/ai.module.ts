import { Module } from '@nestjs/common';
import { AiService } from 'src/chat/ai/ai.service';

@Module({
  imports: [],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
