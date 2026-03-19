/* TODO: remove this file and use the logic of the
service in the chat service
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from 'src/chat/ai/ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/generate')
  async generateText(@Body() body: { prompt: string }) {
    const response = await this.aiService.aiGenerate(body.prompt);
    return response;
  }
}
