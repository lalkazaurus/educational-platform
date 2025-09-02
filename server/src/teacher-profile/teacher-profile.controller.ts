import { Controller } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';

@Controller('teacher-profile')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}
}
