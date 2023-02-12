import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { UserStatus } from '~/enums';

export class UpdateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsNotEmpty()
  @IsOptional()
  status?: UserStatus;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  hash?: string;
}
