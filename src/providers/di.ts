import { PrismaClient } from '@prisma/client';

import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '../modules/jwt';
import { UserService } from '../modules/user';
import { ConfigService } from './config.service';

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
    });
  }

  get userService(): UserService {
    return new UserService();
  }

  get authService(): AuthService {
    return new AuthService(this.userService, this.jwtService);
  }

  get prismaService(): PrismaClient {
    return new PrismaClient();
  }
}
