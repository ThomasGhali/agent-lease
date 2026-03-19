import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';
import { AiModule } from 'src/chat/ai/ai.module';
import { PersistenceModule } from 'src/chat/persistence/persistence.module';
import { ChatController } from './chat.controller';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [AiModule, PersistenceModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
