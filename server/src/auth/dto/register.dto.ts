import { AuthPayloadDto } from "./auth.dto";
import { IsPhoneNumber, IsString } from 'class-validator';

export class RegisterPayloadDto extends AuthPayloadDto {
  @IsString()
  username: string;
  
  @IsPhoneNumber()
  phoneNumber: string;
}
