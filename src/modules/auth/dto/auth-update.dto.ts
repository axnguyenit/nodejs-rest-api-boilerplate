import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

// import { FileEntity } from '~/modules/file/entities/file.entity';
// import { IsExist } from '~/validators/is-exists.validator';

export class AuthUpdateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  fullName?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;
}
