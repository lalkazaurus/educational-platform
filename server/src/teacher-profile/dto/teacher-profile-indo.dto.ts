import { Expose } from "class-transformer";

export class TeacheProfileInfoDto {
    @Expose()
    fullName: string;
    @Expose()
    bio: string;
    @Expose()
    degree: string;
    @Expose()
    experience: string;
    @Expose()
    pricePerHour: number;
    @Expose()
    languages: string[];
    @Expose()
    levels: string[];
    @Expose()
    rating: number
}