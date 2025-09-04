import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { TeacherProfileDto } from './dto/teacher-profile.dto';
import { Request } from 'express';
import { ValidatedPayloadDto } from 'src/auth/dto/validated.dto';

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
    const userId = req.user as ValidatedPayloadDto; 
    return await this.teacherProfileService.delete(userId.id)
  }
}
