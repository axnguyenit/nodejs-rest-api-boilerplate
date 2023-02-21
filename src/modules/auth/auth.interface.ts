import type { User } from '@prisma/client';

import type { AuthEmailLoginDto, AuthRegisterDto } from './dto';

export interface AuthService {
  validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{
    token: string;
    user: Omit<User, keyof User>;
  }>;

  register(dto: AuthRegisterDto): Promise<User>;

  forgotPassword(email: string): Promise<void>;
}
