import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { TeacherProfileDto } from './dto/teacher-profile.dto';

@Controller('teacher-profile')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Get("create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async create(
    @Body() teacher: TeacherProfileDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    this.teacherProfileService.create(teacher, id)
  }

  @Patch("update")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async update(
    @Body() teacher: TeacherProfileDto,
    @Req() req
  ) {
    const userId = req.user.id; 
    return await this.teacherProfileService.update(teacher, userId);
  }

  @Delete("/delete")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.TEACHER)
  async delete(@Req() req) {
    const userId = req.user.id; 
    return await this.teacherProfileService.delete(userId)
  }
}
