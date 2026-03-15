import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { PersistenceService } from './chat/persistence/persistence.service';
import { AiService } from './chat/ai/ai.service';
import { AiController } from './chat/ai/ai.controller';

@Module({
  imports: [],
  controllers: [AppController, AiController],
  providers: [AppService, ChatGateway, ChatService, PersistenceService, AiService],
})
export class AppModule {}
