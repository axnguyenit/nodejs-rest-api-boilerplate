/* eslint no-console: 0 */

import readline from 'node:readline';

import colors from 'picocolors';

export type LogType = 'error' | 'info';
export type LogLevel = LogType | 'silent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogMessage = any;

export interface Logger {
  info(msg: LogMessage, options?: LogOptions): void;
  error(msg: LogMessage, options?: LogOptions): void;
}
export const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  info: 2,
};

interface LogOptions {
  prefix?: string;
}

let lastType: LogType | undefined;
let lastMessage: string | undefined;
let sameCount = 0;

function clearScreen() {
  const repeatCount = process.stdout.rows - 2;
  const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

export interface LoggerOptions {
  prefix?: string;
  isAllowClearScreen?: boolean;
}

function createLogger(
  level: LogLevel = 'info',
  _options: LoggerOptions = {},
): Logger {
  const { isAllowClearScreen = true } = _options;
  const thresh = LogLevels[level];
  const canClearScreen =
    isAllowClearScreen && process.stdout.isTTY && !process.env.CI;

  const clear = canClearScreen ? clearScreen : () => {};

  function output(type: LogType, msg: LogMessage, options?: LogOptions) {
    const prefix = options?.prefix ? `[${options?.prefix}]` : '[ax]';
    const objString = JSON.stringify(msg);

    if (thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type;

      const format = () => {
        const message =
          type === 'info'
            ? colors.blue(colors.bold(`${prefix} [${objString}]`))
            : colors.red(colors.bold(`${prefix} [${objString}]`));

        return `${colors.dim(new Date().toLocaleTimeString())} ${message}`;
      };

      if (canClearScreen) {
        if (type === lastType && objString === lastMessage) {
          console[method](format(), colors.yellow(`(x${sameCount + 1})`));
          sameCount++;
          clear();
        } else {
          sameCount = 0;
          lastMessage = objString;
          lastType = type;
          console[method](format());
        }
      } else {
        console[method](format());
      }
    }
  }

  const logger: Logger = {
    info(msg, opts) {
      output('info', msg, opts);
    },
    error(msg, opts) {
      output('error', msg, opts);
    },
  };

  return logger;
}

export const logger = createLogger();
