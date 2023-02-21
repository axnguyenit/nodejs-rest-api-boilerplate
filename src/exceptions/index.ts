import { HttpError } from 'routing-controllers';

import type { ErrorCode } from '~/enums';

export interface ErrorDetails {
  message: string;
  key: string;
  code: ErrorCode;
}

export class HttpException extends HttpError {
  public statusCode: number;

  public errors: Array<ErrorDetails>;

  constructor(statusCode: number, errors: Array<ErrorDetails>) {
    super(statusCode);
    this.statusCode = statusCode;
    this.errors = errors;

    Object.defineProperty(this, 'stack', { value: '', configurable: true });
  }
}
