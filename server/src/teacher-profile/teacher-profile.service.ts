import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeacherProfile } from './entities/teacher-profile.entity';
import { TeacherProfileDto } from './dto/teacher-profile.dto';

@Injectable()
export class TeacherProfileService {
    constructor (
        @Inject("TEACHER_PROFILE_REPOSITORY")
        private teacherProfileRepository: Repository<TeacherProfile>
    ) {}

    async create(teacherInfo: TeacherProfileDto, userId: number) {
        const existingTeacher = await this.teacherProfileRepository.find({
            where: {userId}
        })

        if (existingTeacher.length > 0) throw new BadRequestException("Teacher Profile for this teacher is already exists")

        const teacher = await this.teacherProfileRepository.create({
            ...teacherInfo,
            userId,
        })
        await this.teacherProfileRepository.save(teacher)
        return teacher
    }

    async update(teacherInfo: TeacherProfileDto, userId: number) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId }
        });

        if (!teacher) {
            throw new BadRequestException("You don't have a teacher profile on this account");
        }

        await this.teacherProfileRepository.update(
            { userId },   
            { ...teacherInfo }
        );

        return "Your profile was successfully updated";
    }

    async delete(userId: number) {
        await this.teacherProfileRepository.delete({
            userId
        })
        return "Your profile was succesfully deleted"
    }
}
