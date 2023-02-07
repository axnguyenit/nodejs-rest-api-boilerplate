import type { Repository } from 'typeorm';

import { TypeOrmService } from '../database/typeorm.service';
import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '../modules/jwt';
import { RoleRepository } from '../modules/role';
import type { Role } from '../modules/role/entities/role.entity';
import type { Status } from '../modules/status/entities/status.entity';
import { StatusRepository } from '../modules/status/status.repository';
import type { User } from '../modules/user';
import { UserRepository, UserService } from '../modules/user';
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

  get databaseService(): TypeOrmService {
    return new TypeOrmService(this.configService);
  }

  get jwtService(): JwtService {
    return new JwtService({
      privateKey: '',
    });
  }

  get userService(): UserService {
    return new UserService(this.userRepository);
  }

  get authService(): AuthService {
    return new AuthService(this.userService, this.jwtService);
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
