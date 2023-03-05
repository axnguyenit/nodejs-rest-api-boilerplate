import type { ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint } from 'class-validator';
import type { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

import { DI } from '~/providers';

type ValidationEntity =
  | {
      id?: number | string;
    }
  | undefined;

@ValidatorConstraint({ name: 'IsNotExist', async: true })
export class IsNotExist implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = <string>validationArguments.constraints[0];
    const currentValue = <ValidationEntity>validationArguments.object;

    const entity: ValidationEntity = await DI.instance.prismaService[
      repository
    ].findFirst({
      where: {
        where: {
          [validationArguments.property]: value,
        },
      },
    });

    if (entity?.id === currentValue?.id) {
      return true;
    }

    return !entity;
  }
}
