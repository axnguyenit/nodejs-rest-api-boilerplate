import type { StatusCode } from 'http-status-code';
import { HttpError } from 'routing-controllers';

export interface IErrorDetails {
  message: string;
  key: string;
  code: string;
}

export class AppError extends HttpError {
  constructor(statusCode: StatusCode, errors: Array<IErrorDetails>) {
    super(statusCode, errors[0].message);
  }
}
