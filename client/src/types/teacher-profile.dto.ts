export interface TeacherProfileDto {
    id: number,
    fullName: string,
    bio: string,
    degree: string,
    experience: string,
    pricePerHour: number,
    languages: string[],
    levels: string[],
    rating: number
}

export interface CreateTeacherDto {
    fullName: string,
    bio: string,
    degree: string,
    experience: string,
    pricePerHour: number,
    image: FileList
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