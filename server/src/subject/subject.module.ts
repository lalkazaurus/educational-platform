import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { subjectProviders } from './subject.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, ...subjectProviders],
  exports: [SubjectService, ...subjectProviders],
  imports: [DatabaseModule]
})
export class SubjectModule {}
