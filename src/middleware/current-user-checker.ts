import type { User } from '@prisma/client';
import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import type { JwtPayload } from '~/modules/jwt';
import { DI } from '~/providers';
import { excludedFields } from '~/utils';

const currentUserChecker = async (action: Action) => {
  try {
    const authorization = action.request.headers.authorization;
    const token = authorization.replace(/^Bearer\s+/, '');
    const decodedUser = DI.instance.jwtService.verify<JwtPayload>(token);
    const userRepository = DI.instance.prismaService.user;
    const user = await userRepository.findFirst({
      where: { id: decodedUser.id },
    });

    return excludedFields<User, keyof User>(user!, ['password', 'hash']);
  } catch {
    throw new UnauthorizedError();
  }
};

export { currentUserChecker };
