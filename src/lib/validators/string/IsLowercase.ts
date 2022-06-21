import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isLowercase = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isLowercase',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_LOWERCASE(propertyKey),
      },
    },
    format: {
      name: 'isLowercase',
      type: 'string',
      validate: validator.isLowercase,
    },
  };
});

type IsLowercaseFn = typeof isLowercase;

/**
 * Check if the string is lowercase.
 */
export const IsLowercase: (
  ...args: Parameters<IsLowercaseFn>
) => ReturnType<IsLowercaseFn> = isLowercase;
