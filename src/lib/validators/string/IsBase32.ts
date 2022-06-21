import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { STRING_PATTERNS } from './utils';

const isBase32Validator = (str: string) =>
  str.length % 8 === 0 && STRING_PATTERNS.IS_BASE32.test(str);

const isBase32 = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'base32',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_BASE32(propertyKey),
      },
    },
    format: {
      name: 'base32',
      type: 'string',
      validate: isBase32Validator,
    },
  };
});

type IsBase32Fn = typeof isBase32;

/**
 * Check if a string is a valid base32 string
 */
export const IsBase32: (
  ...args: Parameters<IsBase32Fn>
) => ReturnType<IsBase32Fn> = isBase32;
