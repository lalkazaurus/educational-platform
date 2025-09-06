import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { TeacherProfileDto } from './dto/teacher-profile.dto';
import { Request } from 'express';
import { ValidatedPayloadDto } from 'src/auth/dto/validated.dto';
import { AddSubjectDto } from './dto/add-subject.dto';
import { AddAvailableTimestDto } from './dto/add-available-times.dto';

@Controller('teacher-profile')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async create(
    @Body() teacher: TeacherProfileDto,
    @Req() req: Request
  ) {
    const user = req.user as ValidatedPayloadDto;
    return await this.teacherProfileService.create(teacher, user.id)
  }

  @Patch("update")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async update(
    @Body() teacher: TeacherProfileDto,
    @Req() req: Request
  ) {
    const user = req.user as ValidatedPayloadDto;
    return await this.teacherProfileService.update(teacher, user.id);
  }

  @Delete("delete")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async delete(@Req() req: Request) {
    const user = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.delete(user.id)
  }

  @Post("add-subject") 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER) 
  async addSubject(@Body() data: AddSubjectDto, @Req() req: Request){
    const user = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.addSubject(user.id, data.subjectId)
  }

  @Post("add-available-time")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async addAvailableTime(@Body() data: AddAvailableTimestDto, @Req() req: Request) {
    const user = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.addAvailableTime(user.id, data.time)
  }
}
