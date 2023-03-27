import type { UserRole } from './user-role.enum';

export type JwtPayload = {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
};
