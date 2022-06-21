import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { STRING_PATTERNS } from './utils';

const isAscii = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      pattern: STRING_PATTERNS.IS_ASCII,
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.IS_ASCII(propertyKey),
      },
    },
  };
});

type IsAsciiFn = typeof isAscii;

/**
 * Check if the string contains only ASCII characters
 */ export const IsAscii: (
  ...args: Parameters<IsAsciiFn>
) => ReturnType<IsAsciiFn> = isAscii;
