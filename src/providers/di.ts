import { TypeOrmService } from '../database/typeorm.service';
import { AuthService } from '../modules/auth/auth.service';
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

  get authService(): AuthService {
    return new AuthService();
  }
}
