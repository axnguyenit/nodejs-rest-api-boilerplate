/* eslint no-console: 0 */

import readline from 'node:readline';

import colors from 'picocolors';

export type LogType = 'error' | 'info';
export type LogLevel = LogType | 'silent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogMessage = any;
export const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  info: 2,
};

interface LogOptions {
  prefix?: string;
}

interface LoggerOptions {
  prefix?: string;
  isAllowClearScreen?: boolean;
}
export interface Logger {
  info(msg: LogMessage, options?: LogOptions): void;
  error(msg: LogMessage, options?: LogOptions): void;
}

export class LoggerImpl implements Logger {
  private isAllowClearScreen: boolean;

  private thresh: number;

  private canClearScreen: boolean;

  private lastType: LogType | undefined;

  private lastMessage: string | undefined;

  private sameCount = 0;

  constructor(
    level: LogLevel = 'info',
    { isAllowClearScreen = true }: LoggerOptions = {},
  ) {
    this.isAllowClearScreen = isAllowClearScreen;
    this.canClearScreen =
      isAllowClearScreen && process.stdout.isTTY && !process.env.CI;
    this.thresh = LogLevels[level];
  }

  info(msg, opts) {
    this.output('info', msg, opts);
  }

  error(msg, opts) {
    this.output('error', msg, opts);
  }

  private clearScreen() {
    const repeatCount = process.stdout.rows - 2;
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }

  private output(type: LogType, msg: LogMessage, options?: LogOptions) {
    const prefix = options?.prefix ? `[${options?.prefix}]` : '[ax]';
    const objString = JSON.stringify(msg);

    if (this.thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type;

      const format = () => {
        const message =
          type === 'info'
            ? colors.blue(colors.bold(`${prefix} ${objString}`))
            : colors.red(colors.bold(`${prefix} ${objString}`));

        return `${colors.dim(new Date().toLocaleTimeString())} ${message}`;
      };

      if (this.canClearScreen) {
        if (type === this.lastType && objString === this.lastMessage) {
          console[method](format(), colors.yellow(`(x${this.sameCount + 1})`));
          this.sameCount++;
          this.clearScreen();
        } else {
          this.sameCount = 0;
          this.lastMessage = objString;
          this.lastType = type;
          console[method](format());
        }
      } else {
        console[method](format());
      }
    }
  }
}
