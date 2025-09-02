import { Controller } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('category')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
}
