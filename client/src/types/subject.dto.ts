export interface InitialSubjectDto {
    name: string,
    description: string,
    icon: string,
    category: string[],
    level: string[]
}

export interface DeleteSubjectDto {
    name: string
}