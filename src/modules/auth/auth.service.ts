import type { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { ErrorCode, UserRole } from '~/enums';
import { DI } from '~/providers';
import type { Logger } from '~/providers/services';
import { excludedFields, randomStringGenerator } from '~/utils';

import { HttpException } from '../../exceptions';
import type { JwtService } from '../jwt';
import type { MailService } from '../mail/mail.service';
import type { UserService } from '../user';
import type { AuthService } from './auth.interface';
import { AuthProviders } from './auth-providers.enum';
import type { AuthEmailLoginDto, AuthRegisterDto } from './dto';

export class AuthServiceImpl implements AuthService {
  private prisma: PrismaClient;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly loggerService: Logger,
    private readonly mailService: MailService,
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
      throw new HttpException(StatusCodes.NOT_FOUND, [
        {
          key: 'user',
          message: `User Not Found`,
          code: ErrorCode.NotFound,
        },
      ]);
    }

    if (user.provider !== AuthProviders.Email) {
      throw new HttpException(StatusCodes.BAD_REQUEST, [
        {
          key: 'sign-in provider',
          message: `Need sign-in via ${user.provider} provider`,
          code: ErrorCode.InvalidRequest,
        },
      ]);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(StatusCodes.BAD_REQUEST, [
        {
          key: 'password',
          message: `Incorrect Password`,
          code: ErrorCode.InvalidField,
        },
      ]);
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    const userExcludedFields = excludedFields<User, keyof User>(user, [
      'password',
      'hash',
    ]);

    return { token, user: userExcludedFields };
  }

  async register(dto: AuthRegisterDto) {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.mailService.userSignUp({
      to: dto.email,
      data: { hash },
    });

    return await this.userService.create({
      ...dto,
      hash,
    });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const hash = crypto
        .createHash('sha256')
        .update(randomStringGenerator())
        .digest('hex');
      // await this.forgotService.create({
      //   hash,
      //   user,
      // });

      await this.mailService.forgotPassword({
        to: email,
        data: { hash },
      });
    } else {
      // throw new AppException(HttpStatus.NOT_FOUND, [
      //   {
      //     key: 'email',
      //     message: `Email Not Found`,
      //     code: ErrorCode.NOT_FOUND,
      //   },
      // ]);
    }
  }
}
