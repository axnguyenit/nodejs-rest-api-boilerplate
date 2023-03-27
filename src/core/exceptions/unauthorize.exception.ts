import { StatusCodes } from 'http-status-codes';

import { AppException } from './app.exception';

export class UnauthorizeException extends AppException {
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
