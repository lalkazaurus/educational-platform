import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { InitialSubjectDto } from './dto/initial-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async create(@Body() subject: InitialSubjectDto) {
    return this.subjectService.create(subject)
  }

  @Patch("/update")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async update(@Body() subject: InitialSubjectDto) {
    return this.subjectService.update(subject)
  }

  @Delete("/delete")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  async delete(@Body() name: string) {
    return this.subjectService.delete(name)
  }

  @Get("")
  async findAll() {
    return await this.subjectService.findAll()
  }
}
