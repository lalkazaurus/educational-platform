import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get("")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async findAll() {
    return this.studentsService.findAll()
  }
}
