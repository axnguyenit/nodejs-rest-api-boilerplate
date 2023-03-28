import { HttpError } from 'routing-controllers';

import type { ErrorCode } from '~/core/types';

export interface ErrorDetails {
  message: string;
  key: string;
  code: ErrorCode | string;
}

export class AppException extends HttpError {
  public statusCode: number;

  public errors: Array<ErrorDetails>;

  constructor(statusCode: number, errors: Array<ErrorDetails>) {
    super(statusCode);
    this.statusCode = statusCode;
    this.errors = errors;

    Object.defineProperty(this, 'stack', { value: '', configurable: true });
  }
}
