import { StatusCodes } from 'http-status-codes';

import { HttpException } from './http-exception';

export class UnauthorizeException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, [
      {
        code: 'AUTH',
        key: 'AUTH',
        message: 'Unauthorize',
      },
    ]);
  }
}
