import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isOctal = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isOctal',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_OCTAL(propertyKey),
      },
    },
    format: {
      name: 'isOctal',
      type: 'string',
      validate: validator.isOctal,
    },
  };
});

type IsOctalFn = typeof isOctal;

/**
 * Check if the string is a valid octal number.
 */
export const IsOctal: (
  ...args: Parameters<IsOctalFn>
) => ReturnType<IsOctalFn> = isOctal;
