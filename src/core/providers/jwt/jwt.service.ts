import * as jwt from 'jsonwebtoken';

import type {
  JwtServiceOptions,
  JwtSignOptions,
  JwtVerifyOptions,
} from './jwt.interface';

export class JwtService {
  constructor(private readonly options: JwtServiceOptions) {}

  sign(payload: string | Buffer | object, options?: JwtSignOptions): string {
    const secret = this.getSecretKey(options);

    return jwt.sign(payload, secret, {
      ...options,
      expiresIn: this.getExpiresIn(options),
    });
  }

  verify<T extends Record<string, unknown>>(
    token: string,
    options?: JwtVerifyOptions,
  ): T {
    const secret = this.getSecretKey(options);

    return <T>jwt.verify(token, secret, options);
  }

  decode(
    token: string,
    options?: jwt.DecodeOptions,
  ): null | Record<string, unknown> | string {
    return jwt.decode(token, options);
  }

  private getSecretKey(
    options: JwtVerifyOptions | JwtSignOptions | undefined,
  ): string | Buffer | jwt.Secret {
    return <jwt.Secret>(options?.secret || this.options.secret);
  }

  private getExpiresIn(options?: JwtSignOptions): string | number | undefined {
    return options?.expiresIn || this.options.signOptions?.expiresIn;
  }
}
