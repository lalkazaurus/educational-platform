import { IsDateString, IsInt, IsString } from "class-validator"

export class InitialStudentDto {
    @IsString()
    fullName: string
    
    @IsDateString()
    dateOfBirth: string
    
    @IsString()
    learning_goal: string

    @IsInt()
    userId: number
}