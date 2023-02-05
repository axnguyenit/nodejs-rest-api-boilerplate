import type { IAuthService } from '../modules/auth/auth.service';
import { AuthService } from '../modules/auth/auth.service';

export class DI {
  private static singleton: DI;

  private constructor() {}

  public static get instance(): DI {
    if (!DI.singleton) {
      DI.singleton = new DI();
    }

    return DI.singleton;
  }

  get authService(): IAuthService {
    return new AuthService();
  }
}
