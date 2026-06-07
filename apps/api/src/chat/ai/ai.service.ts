import { groq } from '@ai-sdk/groq';
import { Injectable } from '@nestjs/common';
import { generateText } from 'ai';
import { Message } from '@repo/common';
import { SenderType } from '@repo/db';

const roleMap = {
  [SenderType.VISITOR]: 'user',
  [SenderType.AI_SUPPORT]: 'assistant',
  [SenderType.HUMAN_SUPPORT]: 'assistant',
} as const;

@Injectable()
export class AiService {
  // TODO: add prompt that is determined by each user
  async aiGenerate(messages: Message[]) {
    const { text, usage } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [
        ...messages.map((msg) => {
          return {
            role: roleMap[msg.sender as keyof typeof roleMap],
            content: msg.message,
          };
        }),
      ],
    });

    return { response: text, usage };
  }
}
