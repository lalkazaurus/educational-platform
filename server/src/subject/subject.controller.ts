import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';
import { InitialSubjectDto } from './dto/initial-subject.dto';
import { DeleteSubjectDto } from './dto/delete-subject.dto';
import { Categories } from './types/categories';

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
  async delete(@Body() data: DeleteSubjectDto) {
    return this.subjectService.delete(data.name)
  }

  @Get("")
  async findAll() {
    return await this.subjectService.findAll()
  }

  @Get("/:category")
  async getSubjectsByCategory(@Param() category: Categories) {
    return await this.subjectService.findSubjectByCategory(category)
  }
}
