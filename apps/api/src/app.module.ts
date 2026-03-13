import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { PersistanceService } from './chat/persistence/persistence.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService, PersistanceService],
})
export class AppModule {}
