/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { IsExist } from '~/validators';

export class AuthEmailLoginDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  @Validate(IsExist, ['User'], {
    message: 'Email Not Exists',
  })
  email: string;

  @IsNotEmpty()
  password: string;
}
