import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeacherProfile } from './entities/teacher-profile.entity';
import { TeacherProfileDto } from './dto/teacher-profile.dto';
import { SubjectService } from 'src/subject/subject.service';
import { notEqual } from 'assert';

@Injectable()
export class TeacherProfileService {
    constructor (
        @Inject("TEACHER_PROFILE_REPOSITORY")
        private teacherProfileRepository: Repository<TeacherProfile>,
        private subjectService: SubjectService
    ) {}

    async findAll() {
        return await this.teacherProfileRepository.find()
    }

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

        if (teacher.length === 0) throw new BadRequestException("This profile doesn't exist")

        await this.teacherProfileRepository.delete({
            userId
        })
        return "Your profile was succesfully deleted"
    }

    async addSubject(userId: number, subjectId: number) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId },
            relations: ["subjects"],
        });

        if (!teacher) throw new BadRequestException("This profile doesn't exist");
        const subject = await this.subjectService.findSubjectById(subjectId);
        if (teacher.subjects.some(s => s.id === subject.id)) {
            throw new BadRequestException("This subject is already on your profile");
        }

        teacher.subjects.push(subject);
        await this.teacherProfileRepository.save(teacher);
        return teacher;
    }

    async removeSubject(userId: number, subjectId: number) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId },
            relations: ["subjects"]
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const subjectIndex = teacher.subjects.findIndex(s => s.id === subjectId);
        if (subjectIndex === -1) {
            throw new BadRequestException("You don't have this subject on your profile");
        }

        teacher.subjects.splice(subjectIndex, 1);
        await this.teacherProfileRepository.save(teacher);
        return teacher;
    }

    async addAvailableTime(userId: number, hours: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId },
        });

        if (!teacher) throw new BadRequestException("This profile doesn't exist");
        const newHours = hours.filter(h => !teacher.availableTimes.includes(h));
        if (newHours.length === 0) {
            throw new BadRequestException("All these times are already added");
        }

        teacher.availableTimes.push(...newHours);
        await this.teacherProfileRepository.save(teacher);
        return teacher;
    }

    async removeAvailableTime(userId: number, hours: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId }
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const hoursToRemove = hours.filter(h => teacher.availableTimes.includes(h))
        if (hoursToRemove.length === 0) {
            throw new BadRequestException("These times doesn't exist on your account")
        }

        const newTimes = teacher.availableTimes.filter(h => !hoursToRemove.includes(h))
        await this.teacherProfileRepository.update(
            { id: teacher.id }, 
            { availableTimes: newTimes }
        )
        return `Hours ${hoursToRemove.join(', ')} succesfully removed from your account`
    }

    async addLanguages(userId: number, languages: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId }
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const newLanguages = languages.filter(l => !teacher.languages.includes(l))
        if (newLanguages.length === 0) {
            throw new BadRequestException("All these languages are already added")
        }

        teacher.languages.push(...newLanguages)
        await this.teacherProfileRepository.save(teacher)
        return teacher
    }

    async removeLanguages(userId: number, languages: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId }
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const languagesToRemove = languages.filter(l => teacher.languages.includes(l))
        if (languagesToRemove.length === 0) {
            throw new BadRequestException("These languages doesn't exist on your account")
        }

        const newLanguages = teacher.languages.filter(l => !languagesToRemove.includes(l))
        await this.teacherProfileRepository.update(
            { id: teacher.id }, 
            { languages: newLanguages }
        )
        return `Languages ${languagesToRemove.join(', ')} succesfully removed from your account`
    }

    async addLevels(userId: number, levels: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: { userId }
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const newLevels = levels.filter(l => !teacher.levels.includes(l))
        if (newLevels.length === 0) {
            throw new BadRequestException("All these levels are already added")
        }

        teacher.levels.push(...newLevels)
        await this.teacherProfileRepository.save(teacher)
        return teacher
    }

    async removeLevels(userId: number, levels: string[]) {
        const teacher = await this.teacherProfileRepository.findOne({
            where: {userId}
        })

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        const lessonsToRemove = levels.filter(l => teacher.levels.includes(l))
        if (lessonsToRemove.length === 0) {
            throw new BadRequestException("These levels doesn't exist on your account")
        }

        const newLessons = teacher.levels.filter(l => !teacher.levels.includes(l))
        await this.teacherProfileRepository.update(
            { id: teacher.id },
            { levels: newLessons }
        )
        return `Lessons ${lessonsToRemove.join(', ')} succesfully removed from your account`
    }
}
