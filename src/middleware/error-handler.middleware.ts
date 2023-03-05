import { ValidationError } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { BadRequestError, Middleware } from 'routing-controllers';

import { HttpException } from '../exceptions';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: unknown,
    _request: Request,
    _response: Response,
    _next: NextFunction,
  ) {
    if (!(error instanceof BadRequestError)) throw error;
    const errors = (error as BadRequestError & { errors: Array<unknown> })
      .errors;
    if (!Array.isArray(errors) || !(errors[0] instanceof ValidationError))
      throw error;

    //
    throw new HttpException(
      StatusCodes.BAD_REQUEST,
      errors.map((_error) => ({
        key: _error.property,
        code: Object.keys(_error.constraints ?? {}).join(', '),
        message: Object.values(_error.constraints ?? {}).join(', '),
      })),
    );
  }
}
