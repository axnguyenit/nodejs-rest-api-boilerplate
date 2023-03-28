import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

import { UserStatus } from '~/core';

import { Role } from '../../role';

export class UpdateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  // @Validate(IsExist, ['Role', 'id'], {
  //   message: 'roleNotExists',
  // })
  role?: Role;

  @IsOptional()
  // @Validate(IsExist, ['Status', 'id'], {
  //   message: 'statusNotExists',
  // })
  status?: UserStatus;

  hash?: string;
}
