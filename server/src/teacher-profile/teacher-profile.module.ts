import { Module } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { TeacherProfileController } from './teacher-profile.controller';
import { DatabaseModule } from 'src/database/database.module';
import { teacherProfileProviders } from './teacher-profile.providers';
import { SubjectModule } from 'src/subject/subject.module';
import { StudentsModule } from 'src/students/students.module';
import { UserModule } from 'src/users/user/user.module';

@Module({
  controllers: [TeacherProfileController],
  providers: [TeacherProfileService, ...teacherProfileProviders],
  imports: [DatabaseModule, SubjectModule, StudentsModule, UserModule],
  exports: [TeacherProfileService, ...teacherProfileProviders]
})
export class TeacherProfileModule {}
