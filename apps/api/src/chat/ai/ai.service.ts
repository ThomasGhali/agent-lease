import { groq } from '@ai-sdk/groq';
import { Injectable } from '@nestjs/common';
import { generateText } from 'ai';

@Injectable()
export class AiService {
  async aiGenerate(prompt: string) {
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: prompt,
    });

    return { response: text };
  }
}
