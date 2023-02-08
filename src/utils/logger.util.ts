/* eslint no-console: 0 */

import readline from 'node:readline';

import colors from 'picocolors';

export type LogType = 'error' | 'info';
export type LogLevel = LogType | 'silent';
export interface Logger {
  info(msg: string | Record<string, unknown>): void;
  error(msg: string | Record<string, unknown>): void;
}
export const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  info: 2,
};

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
  customLogger?: Logger;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function createLogger(
  level: LogLevel = 'info',
  _options: LoggerOptions = {},
): Logger {
  if (_options.customLogger) {
    return _options.customLogger;
  }

  const { prefix = '[ax]', isAllowClearScreen = true } = _options;
  const thresh = LogLevels[level];
  const canClearScreen =
    isAllowClearScreen && process.stdout.isTTY && !process.env.CI;

  const clear = canClearScreen ? clearScreen : () => {};

  function output(type: LogType, msg: string | Record<string, unknown>) {
    const objString = JSON.stringify(msg);

    if (thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type;

      const format = () => {
        const message =
          type === 'info'
            ? colors.blue(colors.bold(`${prefix} >>>> [${objString}]`))
            : colors.red(colors.bold(`${prefix} >>>> [${objString}]`));

        return `${colors.dim(new Date().toLocaleTimeString())} ${message} `;
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
    info(msg) {
      output('info', msg);
    },
    error(msg) {
      output('error', msg);
    },
  };

  return logger;
}

export const logger = createLogger();
