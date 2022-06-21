import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isUppercase = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isUppercase',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_UPPERCASE(propertyKey),
      },
    },
    format: {
      name: 'isUppercase',
      type: 'string',
      validate: validator.isUppercase,
    },
  };
});

type IsUppercase = typeof isUppercase;

/**
 * Check if the string is uppercase.
 */
export const IsUppercase: (
  ...args: Parameters<IsUppercase>
) => ReturnType<IsUppercase> = isUppercase;
