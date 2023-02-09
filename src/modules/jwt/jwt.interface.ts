import type { User } from '@prisma/client';
import type { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export enum JwtSecretRequestType {
  SIGN,
  VERIFY,
}

export interface JwtServiceOptions {
  secret: string | Buffer;
  publicKey?: string | Buffer;
  privateKey?: Secret;
  signOptions?: SignOptions;
  verifyOptions?: VerifyOptions;
}

export interface JwtSignOptions extends SignOptions {
  secret?: string | Buffer;
  privateKey?: string | Buffer;
}

export interface JwtVerifyOptions extends VerifyOptions {
  secret?: string | Buffer;
  publicKey?: string | Buffer;
}

export type JwtPayload = Pick<User, 'id' | 'role'> & {
  iat: number;
  exp: number;
};
