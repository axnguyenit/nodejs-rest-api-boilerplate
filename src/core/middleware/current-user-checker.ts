import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import type { JwtPayload } from '~/core';
import { DI } from '~/core';

const currentUserChecker = (action: Action) => {
  try {
    const authorization = action.request.headers.authorization;
    if (!authorization) throw new UnauthorizedError();
    const token = authorization.replace(/^Bearer\s+/, '');

    return DI.instance.jwtService.verify<JwtPayload>(token);
  } catch {
    throw new UnauthorizedError();
  }
};

export { currentUserChecker };
