import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeacherProfile } from './entities/teacher-profile.entity';
import { TeacherProfileDto } from './dto/teacher-profile.dto';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class TeacherProfileService {
    constructor (
        @Inject("TEACHER_PROFILE_REPOSITORY")
        private teacherProfileRepository: Repository<TeacherProfile>,
        private subjectService: SubjectService
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
        const teacher = await this.teacherProfileRepository.find({
            where: {userId}
        })

        if (teacher.length > 0) throw new BadRequestException("This profile doesn't exist")

        await this.teacherProfileRepository.delete({
            userId
        })
        return "Your profile was succesfully deleted"
    }

    async addSubject(teacherId: number, subjectId: number) {
        const subject = await this.subjectService.findSubjectById(subjectId);

        const teacher = await this.teacherProfileRepository.findOne({
            where: { id: teacherId },
            relations: ["subject"], 
        });

        if (!teacher) throw new BadRequestException("This profile doesn't exist");

        if (teacher.subject.some(s => s.id === subject[0].id)) {
            throw new BadRequestException("This subject is already on your profile");
        }

        teacher.subject.push(subject[0]);

        await this.teacherProfileRepository.save(teacher);

        return teacher;
    }
}
