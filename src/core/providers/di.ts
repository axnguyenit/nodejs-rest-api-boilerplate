import type { Repository } from 'typeorm';

import { TypeOrmService } from '~/database/typeorm.service';
import type { AuthService } from '~/modules/auth';
import { AuthServiceImpl } from '~/modules/auth';
import { RoleRepository, RoleService } from '~/modules/role';
import type { Role } from '~/modules/role/entities/role.entity';
import type { User, UserService } from '~/modules/user';
import { UserRepository, UserServiceImpl } from '~/modules/user';

import type { Logger } from '..';
import { ConfigService, JwtService, LoggerImpl } from '..';

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

  get databaseService(): TypeOrmService {
    return new TypeOrmService(this.configService);
  }

  get jwtService(): JwtService {
    return new JwtService({
      secret: this.configService.get<string>('auth.secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('auth.expires'),
      },
    });
  }

  get userService(): UserService {
    return new UserServiceImpl(this.userRepository);
  }

  get authService(): AuthService {
    return new AuthServiceImpl(this.userService, this.jwtService);
  }

  get roleService(): RoleService {
    return new RoleService(this.roleRepository);
  }

  get loggerService(): Logger {
    return new LoggerImpl();
  }

  // *********** REPOSITORIES *********** //

  get roleRepository(): Repository<Role> {
    return RoleRepository;
  }

  get userRepository(): Repository<User> {
    return UserRepository;
  }
}
