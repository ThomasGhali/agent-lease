import { Module } from '@nestjs/common';
import { PersistenceService } from 'src/chat/persistence/persistence.service';

@Module({
  providers: [PersistenceService],
  exports: [PersistenceService],
})
export class PersistenceModule {}
