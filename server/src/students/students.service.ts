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

    async findStudentsProfileByUserId(userId: number) {
        const student = await this.studentsRepository.findOne({
            where: {userId}
        })

        return student
    }

    async createStudentProfile(studentInfo: InitialStudentDto, userId: number) {
        const existingStudent = await this.studentsRepository.findOne({
            where: {userId}
        })

        if (existingStudent) throw new BadRequestException("This student profile is already exists")

        const student = await this.studentsRepository.create({...studentInfo, userId})
        this.studentsRepository.save(student)
        await this.userService.becomeStudent(userId)

        return student
    }

    async updateStusentProfile(studentInfo: InitialStudentDto, userId: number) {
        await this.studentsRepository.update(
            {userId}, 
            {...studentInfo}
        )

        return {
            message: "Your profile was succesfully updated"
        }
    } 

    async deleteStusentProfile(userId: number) {
        await this.studentsRepository.delete({userId})

        return {
            message: "Your profile was succesfully updated"
        }
    }
}
