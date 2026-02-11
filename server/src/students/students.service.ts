import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InitialStudentDto } from './dto/initial-subject.dto';
import { UserService } from 'src/users/user/user.service';

@Injectable()
export class StudentsService {
    constructor (
        @Inject("STUDENTS_REPOSITORY")
        private studentsRepository: Repository<Student>,
        private readonly userService: UserService
    ) {}

    async findAll() {
        return await this.studentsRepository.find()
    }

    async findStudentProfileByUserId(userId: number) {
        const student = await this.studentsRepository.findOne({
            where: {userId}
        })

        return student
    }

    async createStudentProfile(studentInfo: InitialStudentDto, userId: number) {
        const existingStudent = await this.studentsRepository.findOne({
            where: {userId}
        })

        if (existingStudent) throw new BadRequestException("This student profile already exists.")

        const student = await this.studentsRepository.create({...studentInfo, userId})
        await this.studentsRepository.save(student)
        await this.userService.addStudentRole(userId)

        return student
    }

    async updateStudentProfile(studentInfo: InitialStudentDto, userId: number) {
        await this.studentsRepository.update(
            {userId}, 
            {...studentInfo}
        )
        return {
            message: "Your profile was succesfully updated"
        }
    } 

    async deleteStudentProfile(userId: number) {
        await this.studentsRepository.delete({userId})
        return {
            message: "Your profile was succesfully deleted"
        }
    }
}
