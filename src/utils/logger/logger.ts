import path from 'path';
import winston, { format } from 'winston';

import type { ILogger } from './logger.interface';

/**
 * core.Log
 * ------------------------------------------------
 *
 * This is the main Logger Object. You can create a scope logger
 * or directly use the static log methods.
 *
 * By Default it uses the debug-adapter, but you are able to change
 * this in the start up process in the core/index.ts file.
 */

export class Logger implements ILogger {
  public static DEFAULT_SCOPE = 'app';

  private logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });

  private static parsePathToScope(filepath: string): string {
    if (filepath.includes(path.sep)) {
      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(path.sep, ':');
    }

    return filepath;
  }

  private scope: string;

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope ?? Logger.DEFAULT_SCOPE);
  }

  public debug(message: string, ...args: Array<unknown>): void {
    this.logger.debug(message, args);
  }

  public info(message: string, ...args: Array<unknown>): void {
    this.logger.info(message, args);
  }

  public warn(message: string, ...args: Array<unknown>): void {
    this.logger.warn(message, args);
  }

  public error(message: string, ...args: Array<unknown>): void {
    this.logger.error(message, args);
  }

  // private log(level: string, message: string, args: Array<unknown>): void {
  //   if (winston) {
  //     winston[level](`${this.formatScope()} ${message}`, args);
  //   }
  // }

  // private formatScope(): string {
  //   return `[${this.scope}]`;
  // }
}
