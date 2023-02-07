import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

import type { Role } from '../../role';
import { Status } from '../../status/entities/status.entity';

export class UpdateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @IsOptional()
  fullName?: string | null;

  @IsOptional()
  // @Validate(IsExist, ['Role', 'id'], {
  //   message: 'roleNotExists',
  // })
  role?: Role | null;

  @IsOptional()
  // @Validate(IsExist, ['Status', 'id'], {
  //   message: 'statusNotExists',
  // })
  status?: Status;

  hash?: string | null;
}
