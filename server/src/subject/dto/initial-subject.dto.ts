import { IsString } from "class-validator"

export class InitialSubjectDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    icon: string
}