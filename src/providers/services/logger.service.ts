/* eslint no-console: 0 */

import readline from 'node:readline';

export type LogType = 'error' | 'info';
export type LogLevel = LogType | 'silent';

/// ANSI Control Sequence Introducer, signals the terminal for new settings.
const ansiEsc = '\u001B[';

/// Reset all colors and options for current SGRs to terminal defaults.
const ansiDefault = `${ansiEsc}0m`;

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

  private topLeftCorner = '┌';

  private topRightCorner = '┐';

  private bottomLeftCorner = '└';

  private bottomRightCorner = '┘';

  private middleLeftCorner = '├';

  private middleRightCorner = '┤';

  private verticalLine = '│';

  private doubleDivider = '─';

  private lineLength = 100;

  constructor(
    level: LogLevel = 'info',
    { isAllowClearScreen = true }: LoggerOptions = {},
  ) {
    this.isAllowClearScreen = isAllowClearScreen;
    this.canClearScreen =
      isAllowClearScreen && process.stdout.isTTY && !process.env.CI;
    this.thresh = LogLevels[level];
  }

  info(msg: LogMessage, opts: LogOptions) {
    this.output('info', msg, opts, 12);
  }

  error(msg: LogMessage, opts: LogOptions) {
    this.output('error', msg, opts, 196);
  }

  private clearScreen() {
    const repeatCount = process.stdout.rows - 2;
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }

  private output(
    type: LogType,
    msg: LogMessage,
    options?: LogOptions,
    fg?: number,
  ) {
    if (process.env.NODE_ENV === 'production') return;

    const method = type === 'info' ? 'log' : type;
    let doubleDividerLine = '';
    let singleDividerLine = '';

    for (let i = 0; i < this.lineLength - 2; i++) {
      doubleDividerLine += this.doubleDivider;
      singleDividerLine += this.doubleDivider;
    }

    const topBorder = `${this.topLeftCorner}${doubleDividerLine}${this.topRightCorner}`;
    const middleBorder = `${this.middleLeftCorner}${singleDividerLine}${this.middleRightCorner}`;
    const bottomBorder = `${this.bottomLeftCorner}${doubleDividerLine}${this.bottomRightCorner}`;
    const prefix = options?.prefix ? `[${options?.prefix}]` : '[ax]';
    const objString = JSON.stringify(msg);

    const log = (count?: number) => {
      console[method](this.wrapColor(topBorder, fg));
      console[method](
        `${this.wrapColor(this.verticalLine, fg)} ${this.wrapColor(
          new Date().toLocaleTimeString(),
          232,
        )}`,
      );
      console[method](this.wrapColor(middleBorder, fg));
      console[method](
        `${this.wrapColor(
          `${this.verticalLine} ${prefix} ${objString}  ${
            count ? `${ansiEsc}33m(x${this.sameCount + 1})${ansiDefault}` : ''
          }`,
          fg,
        )}`,
      );
      console[method](this.wrapColor(bottomBorder, fg));
    };

    if (this.thresh >= LogLevels[type]) {
      if (this.canClearScreen) {
        if (type === this.lastType && objString === this.lastMessage) {
          this.sameCount++;
          log(this.sameCount);
          this.clearScreen();
        } else {
          this.sameCount = 0;
          this.lastMessage = objString;
          this.lastType = type;
          log();
        }
      } else {
        log();
      }
    }
  }

  private wrapColor(message: string, fg?: number): string {
    return `${ansiEsc}38;5;${fg}m${message}${ansiDefault}`;
  }
}
