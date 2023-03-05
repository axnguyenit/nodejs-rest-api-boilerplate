import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

import { UserStatus } from '~/enums';
import { IsNotExist } from '~/validators';

export class UpdateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'Email already existed',
  })
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsNotEmpty()
  @MinLength(8)
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
