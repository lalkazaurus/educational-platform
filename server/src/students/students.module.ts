import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { studentProviders } from './students.providers';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, ...studentProviders],
  exports: [StudentsService, ...studentProviders]
})
export class StudentsModule {}
