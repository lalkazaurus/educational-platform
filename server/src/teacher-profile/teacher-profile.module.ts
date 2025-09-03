import { Module } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { TeacherProfileController } from './teacher-profile.controller';
import { DatabaseModule } from 'src/database/database.module';
import { teacherProfileProviders } from './teacher-profile.providers';

@Module({
  controllers: [TeacherProfileController],
  providers: [TeacherProfileService, ...teacherProfileProviders],
  imports: [DatabaseModule],
  exports: [TeacherProfileService, ...teacherProfileProviders]
})
export class TeacherProfileModule {}
