import { IsDecimal, IsInt, IsString, MaxLength, MinLength } from "class-validator"

export class TeacherProfileDto {

    @IsString()
    fullName: string
    
    @IsString()
    @MinLength(10, {message: "Bio has to be longer than 10 symbols"})
    @MaxLength(100, {message: "Bio has to be shorter than 100 symbols"})
    bio: string

    @IsString()
    degree: string
    
    @IsString()
    experience: string
    
    @IsDecimal()
    pricePerHour: number;

    
    @IsInt()
    userId: number;
}