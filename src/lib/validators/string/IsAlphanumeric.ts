import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { STRING_PATTERNS } from './utils';

const isAlphanumeric = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;
  return {
    constraint: {
      pattern: STRING_PATTERNS.IS_ALPHANUMERIC,
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.IS_ALPHANUMERIC(propertyKey),
      },
    },
  };
});

type IsAlphanumeric = typeof isAlphanumeric;

/**
 * Check if the string contains only alphabetic and numeric characters.
 */
export const IsAlphanumeric: (
  ...args: Parameters<IsAlphanumeric>
) => ReturnType<IsAlphanumeric> = isAlphanumeric;
