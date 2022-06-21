import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isHexadecimal = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isHexadecimal',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_HEXADECIMAL(propertyKey),
      },
    },
    format: {
      name: 'isHexadecimal',
      type: 'string',
      validate: validator.isHexadecimal,
    },
  };
});

type IsHexadecimalFn = typeof isHexadecimal;

/**
 * Check if the string is a hexadecimal number.
 */
export const IsHexadecimal: (
  ...args: Parameters<IsHexadecimalFn>
) => ReturnType<IsHexadecimalFn> = isHexadecimal;
