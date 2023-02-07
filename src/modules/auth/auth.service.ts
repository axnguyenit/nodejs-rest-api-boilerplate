import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { randomStringGenerator } from '../../utils';
import type { JwtService } from '../jwt';
import { AppRole } from '../role';
import type { Role } from '../role/entities/role.entity';
import type { Status } from '../status/entities/status.entity';
import { AppStatus } from '../status/status.enum';
import type { User, UserService } from '../user';
import { AuthProviders } from './auth-providers.enum';
import type { AuthEmailLoginDto, AuthRegisterDto } from './dto';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });

    if (
      !user ||
      (user &&
        !(
          onlyAdmin ? [AppRole.SuperAdmin, AppRole.Admin] : [AppRole.User]
        ).includes(user.role.id))
    ) {
      // throw new AppException(HttpStatus.NOT_FOUND, [
      //   {
      //     key: 'user',
      //     message: `User Not Found`,
      //     code: ErrorCode.NOT_FOUND,
      //   },
      // ]);
      throw new Error('error');
    }

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
      const token = this.jwtService.sign({
        id: user.id,
        role: user.role,
      });

      return { token, user };
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

  async register(dto: AuthRegisterDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.userService.create({
      ...dto,
      email: dto.email,
      role: {
        id: AppRole.User,
      } as Role,
      status: <Status>{
        id: AppStatus.Inactive,
      },
      hash,
    });

    console.info('>>>>>>>>>>>', user);

    // await this.mailService.userSignUp({
    //   to: user.email,
    //   data: {
    //     hash,
    //   },
    // });
  }
}
