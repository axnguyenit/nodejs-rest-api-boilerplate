import { PrismaClient } from '@prisma/client';

import { AuthService } from '~/modules/auth/auth.service';
import { JwtService } from '~/modules/jwt';
import { UserService } from '~/modules/user';

import { MailService } from '../modules/mail/mail.service';
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
    return new UserService();
  }

  get authService(): AuthService {
    return new AuthService(
      this.userService,
      this.jwtService,
      this.loggerService,
      this.mailService,
    );
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
}
