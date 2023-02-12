import type { Repository } from 'typeorm';

import { TypeOrmService } from '../database/typeorm.service';
import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '../modules/jwt';
import { RoleRepository, RoleService } from '../modules/role';
import type { Role } from '../modules/role/entities/role.entity';
import type { Status } from '../modules/status/entities/status.entity';
import { StatusRepository } from '../modules/status/status.repository';
import type { User } from '../modules/user';
import { UserRepository, UserService } from '../modules/user';
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

  get databaseService(): TypeOrmService {
    return new TypeOrmService(this.configService);
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
    return new UserService(this.userRepository);
  }

  get authService(): AuthService {
    return new AuthService(this.userService, this.jwtService);
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

  get statusRepository(): Repository<Status> {
    return StatusRepository;
  }

  get userRepository(): Repository<User> {
    return UserRepository;
  }
}
