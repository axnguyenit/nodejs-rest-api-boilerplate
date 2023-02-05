export interface ILogger {
  debug(message: string, ...args: Array<unknown>): void;
  info(message: string, ...args: Array<unknown>): void;
  warn(message: string, ...args: Array<unknown>): void;
  error(message: string, ...args: Array<unknown>): void;
}
