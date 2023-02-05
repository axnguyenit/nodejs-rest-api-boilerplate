import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class AuthForgotPasswordDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  email: string;
}
