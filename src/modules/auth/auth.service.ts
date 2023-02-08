import type { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { ErrorCode, UserRole } from '../../enums';
import { AppError } from '../../errors';
import { DI } from '../../providers';
import { randomStringGenerator } from '../../utils';
import type { JwtService } from '../jwt';
import type { UserService } from '../user';
import { AuthProviders } from './auth-providers.enum';
import type { AuthEmailLoginDto, AuthRegisterDto } from './dto';

export class AuthService {
  private prisma: PrismaClient;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.prisma = DI.instance.prismaService;
  }

  async validateLogin(loginDto: AuthEmailLoginDto, onlyAdmin: boolean) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (
      !user ||
      (user &&
        !(
          onlyAdmin ? [UserRole.SuperAdmin, UserRole.Admin] : [UserRole.User]
        ).includes(UserRole[user.role]))
    ) {
      throw new AppError(StatusCodes.NOT_FOUND, [
        {
          key: 'user',
          message: `User Not Found`,
          code: ErrorCode.NOT_FOUND,
        },
      ]);
    }

    if (user.provider !== AuthProviders.Email) {
      throw new AppError(StatusCodes.BAD_REQUEST, [
        {
          key: 'sign-in provider',
          message: `Need sign-in via ${user.provider} provider`,
          code: ErrorCode.INVALID_REQUEST,
        },
      ]);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AppError(StatusCodes.BAD_REQUEST, [
        {
          key: 'password',
          message: `Incorrect Password`,
          code: ErrorCode.INVALID_FIELD,
        },
      ]);
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { token, user };
  }

  async register(dto: AuthRegisterDto) {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    return await this.userService.create({
      ...dto,
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
