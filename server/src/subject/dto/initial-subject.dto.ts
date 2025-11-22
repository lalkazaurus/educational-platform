import { IsEnum, IsString } from "class-validator"
import { Categories } from "../types/categories";
import { Levels } from "../types/levels";

export class InitialSubjectDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    icon: string

    @IsEnum(Categories, { message: "Category must be a valid enum value" })
    category: Categories;

    @IsEnum(Levels, { message: "Level must be a valid enum value", each: true })
    level: Levels[];
}