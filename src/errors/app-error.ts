import type { StatusCodes } from 'http-status-codes';

export interface ErrorDetails {
  message: string;
  key: string;
  code: string;
}

export class AppError extends Error {
  private errors: Array<ErrorDetails>;

  constructor(statusCode: StatusCodes, errors: Array<ErrorDetails>) {
    super(statusCode.toString());

    this.errors = errors;
  }
}
