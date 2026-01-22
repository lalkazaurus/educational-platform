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
import { TeacherProfileGuard } from './guards/teacher-profile.guard';
import { FullTeacherProfileDto } from './dto/full-teacher-profile.dto';
import { plainToInstance } from 'class-transformer';
import { TeacheProfileInfoDto } from './dto/teacher-profile-indo.dto';

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
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async update(
    @Body() dto: TeacherProfileDto,
    @Req() req: Request
  ) {
    const user = req.user as ValidatedPayloadDto;
    return await this.teacherProfileService.update(dto, user.id);
  }

  @Delete("delete")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async delete(@Req() req: Request) {
    const user = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.delete(user.id)
  }

  @Post("add-subject") 
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER) 
  async addSubject(@Body() data: AddSubjectDto, @Req() req: any){
    const teacher = req.teacher as FullTeacherProfileDto
    return await this.teacherProfileService.addSubject(data.subjectId, teacher)
  }

  @Patch("remove-subject")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async removeSubject(@Body() data: AddSubjectDto, @Req() req: any) {
    const teacher = req.teacher as FullTeacherProfileDto
    return await this.teacherProfileService.removeSubject(data.subjectId, teacher)
  }

  @Post("add-available-time")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async addAvailableTime(@Body() data: AddAvailableTimesDto, @Req() req: any) {
    const teacher = req.teacher as FullTeacherProfileDto;
    return await this.teacherProfileService.addAvailableTime(data.time, teacher)
  }

  @Patch("remove-available-time")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async removeAvailableTime (@Body() data: AddAvailableTimesDto, @Req() req: any) {
    const teacher = req.teacher as FullTeacherProfileDto;
    return await this.teacherProfileService.removeAvailableTime(data.time, teacher)
  }

  @Post("add-languages")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async addLanguages(@Body() data: AddLanguagesDto, @Req() req: any) {
    const teacher = req.teacher as FullTeacherProfileDto
    return await this.teacherProfileService.addLanguages(data.languages, teacher)
  }

  @Patch("remove-languages")
  @UseGuards(JwtAuthGuard, RolesGuard, TeacherProfileGuard)
  @Role(Roles.TEACHER)
  async removeLanguages(@Body() data: AddLanguagesDto, @Req() req: any) {
    const teacher = req.teacher as FullTeacherProfileDto
    return await this.teacherProfileService.removeLanguages(data.languages, teacher)
  }

  @Get("/:subject")
  async getTeachersProfilesBySubject(@Param("subject") subject: string) {
    return await this.teacherProfileService.getTeachersProfilesBySubject(subject)
  }

  @Get("/id/:id")
  async getTeachersProfileByFullName(@Param("id") id: number) {
    const teacher =  await this.teacherProfileService.findTeacherById(id);
    
    return plainToInstance(TeacheProfileInfoDto, teacher, {
      excludeExtraneousValues: true
    })
  }
}
