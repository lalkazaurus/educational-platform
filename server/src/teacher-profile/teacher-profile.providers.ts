import { DataSource } from "typeorm";
import { TeacherProfile } from "./entities/teacher-profile.entity";

export const teacherProfileProviders = [
    {
        provide: 'TEACHER_PROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TeacherProfile),
        inject: ['DATA_SOURCE'],
    }
]