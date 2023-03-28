import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

// import { IsExist } from '~/validators/is-exists.validator';

export class EmailSignInDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  // @Validate(IsExist, ['User'], {
  //   message: 'Email Not Exists',
  // })
  email: string;

  @IsNotEmpty()
  password: string;
}
