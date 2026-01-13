export interface TeacherProfileDto {
    fullName: string,
    bio: string,
    degree: string,
    experience: string,
    pricePerHour: number
}

export interface AvailableTimeDto {
    time: string[]
}

export interface AddSubjectDto {
    teacherId: number,
    subjectId: number
}

export interface AddLanguages {
    languages: string[]
}