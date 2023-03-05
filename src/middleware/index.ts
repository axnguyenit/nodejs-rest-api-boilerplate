export * from './authorization-checker';
export * from './current-user-checker';
export * from './error-handler.middleware';
// @Middleware({ type: 'after' })
// export class ValidationErrorHandler implements ExpressErrorMiddlewareInterface {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   error(error: any, request: Request, response: Response, next: NextFunction) {
//     // eslint-disable-next-line unicorn/no-instanceof-array
//     if (
//       Array.isArray(error) &&
//       error.every((err) => err instanceof ValidationError)
//     ) {
//       // Map the validation errors to a more user-friendly format
//       // eslint-disable-next-line unicorn/no-array-reduce
//       const errors = (error as Array<ValidationError>).reduce((acc, err) => {
//         const constraints = err.constraints || {};

//         return { ...acc, [err.property]: Object.values(constraints) };
//       }, {});

//       // Customize the response
//       response.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors,
//       });
//     } else {
//       // Pass the error to the next error handler
//       next(error);
//     }
//   }
// }
