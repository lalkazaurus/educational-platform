import { IsString, MinLength, Matches, IsEmail } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  email: string
  
  @IsString()
  @MinLength(8, { message: 'Пароль має містити мінімум 8 символів' })
  @Matches(/[A-Z]/, { message: 'Пароль повинен містити хоча б одну велику літеру' })
  @Matches(/[0-9]/, { message: 'Пароль повинен містити хоча б одну цифру' })
  password: string;
}