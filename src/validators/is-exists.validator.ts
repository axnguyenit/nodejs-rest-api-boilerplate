import type { ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint } from 'class-validator';
import type { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

import { DI } from '~/providers';

@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];
    const entity: unknown = await DI.instance.prismaService[
      repository
    ].findFirst({
      where: {
        [pathToProperty ?? validationArguments.property]: pathToProperty
          ? value?.[pathToProperty]
          : value,
      },
    });

    return Boolean(entity);
  }
}
