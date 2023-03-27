import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import type { JwtPayload } from '~/core/types';
import { UserRole } from '~/core/types';
import { DI } from '~/providers';

const authorizationChecker = (action: Action, roles: Array<UserRole>) => {
  try {
    const authorization = action.request.headers.authorization;
    if (!authorization) throw new UnauthorizedError();
    const token = authorization.replace(/^Bearer\s+/, '');
    const user = DI.instance.jwtService.verify<JwtPayload>(token);
    if (roles.length === 0) return true;

    return roles.includes(UserRole[user.role]);
  } catch {
    throw new UnauthorizedError();
  }
};

export { authorizationChecker };
