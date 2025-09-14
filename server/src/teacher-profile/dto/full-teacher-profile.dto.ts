import { Subject } from "src/subject/entities/subject.entity";
import { TeacherProfileDto } from "./teacher-profile.dto";

export class FullTeacherProfileDto extends TeacherProfileDto {
    id: number
    subjects: Subject[]
    availableTimes: string[]
    languages: string[]
    levels: string[]
}