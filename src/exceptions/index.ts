import { HttpError } from 'routing-controllers';

export interface ErrorDetails {
  message: string;
  key: string;
  code: string;
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
