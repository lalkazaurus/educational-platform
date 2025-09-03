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
        const teacher = await this.teacherProfileRepository.create({
            fullName: teacherInfo.fullName,
            bio: teacherInfo.bio,
            degree: teacherInfo.degree,
            experience: teacherInfo.experience,
            pricePerHour: teacherInfo.pricePerHour,
            userId: userId
        })
        await this.teacherProfileRepository.save(teacher)
        return teacher
    }

    async update(teacherInfo: TeacherProfileDto, userId: number) {
        const teacher = this.teacherProfileRepository.findOne({
            where: {
                userId
            }
        })

        if(!teacher) throw new BadRequestException("You don't have a teacher profile on this account")

        await this.teacherProfileRepository.update(
        { id: userId }, {
            fullName: teacherInfo.fullName,
            bio: teacherInfo.bio,
            degree: teacherInfo.degree,
            experience: teacherInfo.experience,
            pricePerHour: teacherInfo.pricePerHour,
        })
    }

    async delete(userId: number) {
        await this.teacherProfileRepository.delete({
            userId
        })
    }
}
