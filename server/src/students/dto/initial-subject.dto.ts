import { IsDateString, IsInt, IsString } from "class-validator"

export class InitialStudentDto {
    @IsString()
    fullName: string
    
    @IsDateString()
    dateOfBirth: string
    
    @IsString()
    learningGoal: string
}