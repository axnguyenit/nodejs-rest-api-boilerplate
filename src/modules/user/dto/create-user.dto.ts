import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import type { Role } from '../../role/entities/role.entity';
import type { Status } from '../../status/entities/status.entity';

export class CreateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @MinLength(6)
  readonly password?: string;

  readonly provider?: string;

  readonly socialId?: string;

  @IsNotEmpty()
  readonly fullName?: string;

  readonly hash?: string | null;

  // @Validate(IsExist, ['Role', 'id'], {
  //   message: 'roleNotExists',
  // })
  readonly role: Role;

  // @Validate(IsExist, ['Status', 'id'], {
  //   message: 'statusNotExists',
  // })
  readonly status: Status;
}
