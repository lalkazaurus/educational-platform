import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { studentProviders } from './students.providers';
import { TeacherProfileModule } from 'src/teacher-profile/teacher-profile.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/users/user/user.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, ...studentProviders],
  exports: [StudentsService, ...studentProviders],
  imports: [DatabaseModule, UserModule]
})
export class StudentsModule {}
