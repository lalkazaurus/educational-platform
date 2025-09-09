import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    constructor (
        @Inject("TEACHER_PROFILE_REPOSITORY")
        private studentsRepository: Repository<Student>,
    ) {}

    async findAll() {
        return await this.studentsRepository.find()
    }
}
