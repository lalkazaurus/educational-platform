import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { InitialStudentDto } from './dto/initial-subject.dto';
import { Request } from 'express';
import { ValidatedPayloadDto } from 'src/auth/dto/validated.dto';
import { StudentsGuard } from './guards/student.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get("")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async findAll() {
    return this.studentsService.findAll()
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: InitialStudentDto, @Req() req: Request) {
    const user = req.user as ValidatedPayloadDto
    return await this.studentsService.createStudentProfile(data, user.id)
  }

  @Patch("update")
  @UseGuards(JwtAuthGuard, RolesGuard, StudentsGuard)
  @Role(Roles.STUDENT)
  async update(@Body() data: InitialStudentDto, @Req() req: any) {
    const user = req.user as ValidatedPayloadDto
    const student = req.student as InitialStudentDto

    return await this.studentsService.updateStusentProfile(student, user.id)
  }

  @Delete("delete")
  @UseGuards(JwtAuthGuard, RolesGuard, StudentsGuard)
  @Role(Roles.STUDENT)
  async delete(@Req() req: Request) {
    const user = req.user as ValidatedPayloadDto
    return await this.studentsService.deleteStusentProfile(user.id)
  }
}
