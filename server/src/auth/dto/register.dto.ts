import { AuthPayloadDto } from "./auth.dto";
import { IsString } from 'class-validator';

export class RegisterPayloadDto extends AuthPayloadDto {
  @IsString()
  username: string
}
