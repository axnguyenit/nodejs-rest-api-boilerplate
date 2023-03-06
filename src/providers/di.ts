import { PrismaClient } from '@prisma/client';

import type { AuthService } from '~/modules/auth';
import { AuthServiceImpl } from '~/modules/auth';
import { JwtService } from '~/modules/jwt';
import { MailService } from '~/modules/mail/mail.service';
import type { UserRepository, UserService } from '~/modules/user';
import { UserRepositoryIml, UserServiceImpl } from '~/modules/user';

import type { Logger } from './services';
import { LoggerImpl } from './services';
import { ConfigService } from './services/config.service';

export class DI {
  private static singleton: DI;

  private constructor() {}

  public static get instance(): DI {
    if (!DI.singleton) {
      DI.singleton = new DI();
    }

    return DI.singleton;
  }

  get configService(): ConfigService {
    return new ConfigService();
  }

  get jwtService(): JwtService {
    return new JwtService({
      secret: this.configService.get<string>('AUTH_JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get<string>('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    });
  }

  get userService(): UserService {
    return new UserServiceImpl();
  }

  get authService(): AuthService {
    return new AuthServiceImpl(this.userService, this.jwtService, this.loggerService, this.mailService);
  }

  get prismaService(): PrismaClient {
    return new PrismaClient();
  }

  get loggerService(): Logger {
    return new LoggerImpl();
  }

  get mailService(): MailService {
    return new MailService(this.configService);
  }

  //
  get userRepository(): UserRepository {
    return new UserRepositoryIml();
  }
}
