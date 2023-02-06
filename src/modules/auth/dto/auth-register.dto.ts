import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// import { IsNotExist } from '~/validators/is-not-exists.validator';

export class AuthRegisterDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;
}
