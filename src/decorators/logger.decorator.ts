import type { Constructable } from 'typedi';
import { Container } from 'typedi';

import { Logger as WinstonLogger } from '~/utils';

export function Logger(scope: string): ParameterDecorator {
  return (object, propertyKey, index): void => {
    const logger = new WinstonLogger(scope);
    const propertyName = propertyKey ? propertyKey.toString() : '';
    Container.registerHandler({
      object: object as Constructable<unknown>,
      propertyName,
      index,
      value: () => logger,
    });
  };
}

export { ILogger } from '~/utils';
