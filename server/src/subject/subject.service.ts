import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { InitialSubjectDto } from './dto/initial-subject.dto';

@Injectable()
export class SubjectService {
    constructor(
        @Inject("SUBJECT_REPOSITORY")
        private readonly subjectRepository: Repository<Subject>
    ) {}

    async create(subjectData: InitialSubjectDto): Promise<Subject | null> {
        const existingSubject = await this.subjectRepository.find({
            where: {name: subjectData.name}
        })

        if (existingSubject.length > 0) throw new BadRequestException("Subject with this name already exists")

        const subject = await this.subjectRepository.create({...subjectData})
        await this.subjectRepository.save(subject)
        return subject
    }

    async update(subjectData: InitialSubjectDto): Promise<string | null> {
        const existingSubject = await this.subjectRepository.find({
            where: {name: subjectData.name}
        })

        if (existingSubject.length === 0) throw new BadRequestException("Subject with this name doesn't exist")

        await this.subjectRepository.update({ name: subjectData.name }, { ...subjectData })
    
        return "Subject was succesfully updated"
    }

    async delete(name: string): Promise<string | null> {
        await this.subjectRepository.delete({ name })

        return "Subject was succesfully deleted"
    }
}
