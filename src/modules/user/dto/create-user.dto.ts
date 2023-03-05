import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

import { IsNotExist } from '~/validators';
export class CreateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'Email already existed',
  })
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  socialId?: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsHash('sha256')
  hash: string;
}
