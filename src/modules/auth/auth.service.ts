import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import type { JwtService } from '~/core';

import type { UserService } from '../user';
import type { AuthService } from './auth.interface';
import { AuthProviders } from './auth-providers.enum';
import type { EmailSignInDto, SignInResponse, SignUpDto } from './dto';

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    loginDto: EmailSignInDto,
    _onlyAdmin: boolean,
  ): Promise<SignInResponse> {
    const user = await this.userService.getUserByEmail(loginDto.email);

    // if (
    //   !user ||
    //   (user &&
    //     !(
    //       onlyAdmin ? [AppRole.SuperAdmin, AppRole.Admin] : [AppRole.User]
    //     ).includes(AppRole[user.role.name]))
    // ) {
    //   // throw new AppException(HttpStatus.NOT_FOUND, [
    //   //   {
    //   //     key: 'user',
    //   //     message: `User Not Found`,
    //   //     code: ErrorCode.NOT_FOUND,
    //   //   },
    //   // ]);
    //   throw new Error('error');
    // }

    if (user.provider !== AuthProviders.Email) {
      // throw new AppException(HttpStatus.BAD_REQUEST, [
      //   {
      //     key: 'sign-in provider',
      //     message: `Need sign-in via ${user.provider} provider`,
      //     code: ErrorCode.INVALID_REQUEST,
      //   },
      // ]);
      throw new Error('error');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const accessToken = this.jwtService.sign({
        id: user.id,
        role: user.role,
      });

      return { accessToken };
    }

    // throw new AppException(HttpStatus.BAD_REQUEST, [
    //   {
    //     key: 'password',
    //     message: `Incorrect Password`,
    //     code: ErrorCode.INVALID_FIELD,
    //   },
    // ]);

    throw new Error('error');
  }

  async signUp(dto: SignUpDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      // .update(randomStringGenerator())
      .digest('hex');

    await this.userService.create({
      ...dto,
      email: dto.email,
      hash,
    });
    // await this.mailService.userSignUp({
    //   to: user.email,
    //   data: {
    //     hash,
    //   },
    // });
  }
}
