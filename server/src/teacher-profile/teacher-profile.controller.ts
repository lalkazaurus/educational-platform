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
import { AddAvailableTimesDto } from './dto/add-available-times.dto';
import { AddLanguagesDto } from './dto/add-languages.dto';
import { AddLevelsDto } from './dto/add-levels.dto';

@Controller('teacher-profile')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Get("")
  async findAll() {
    return await this.teacherProfileService.findAll()
  }

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
  async addAvailableTime(@Body() data: AddAvailableTimesDto, @Req() req: Request) {
    const user = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.addAvailableTime(user.id, data.time)
  }

  @Post("add-languages")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async addLanguages(@Body() data: AddLanguagesDto, @Req() req: Request) {
    const user = req.user as ValidatedPayloadDto;
    return await this.teacherProfileService.addLanguages(user.id, data.languages)
  }

  @Post("add-levels")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async addLevels(@Body() data: AddLevelsDto, @Req() req: Request) {
    const user = req.user as ValidatedPayloadDto;
    return await this.teacherProfileService.addLevels(user.id, data.levels)
  }
}
