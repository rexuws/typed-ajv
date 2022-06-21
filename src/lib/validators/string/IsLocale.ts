import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isLocale = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isLocale',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_LOCALE(propertyKey),
      },
    },
    format: {
      name: 'isLocale',
      type: 'string',
      validate: validator.isLocale,
    },
  };
});

type IsLocaleFn = typeof isLocale;

/**
 * Check if the string is a locale.
 */
export const IsLocale: (
  ...args: Parameters<IsLocaleFn>
) => ReturnType<IsLocaleFn> = isLocale;
