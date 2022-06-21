import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils';

const isBase64 = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'base64',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_BASE64(propertyKey),
      },
    },
    format: {
      name: 'base64',
      type: 'string',
      validate: validator.isBase64,
    },
  };
});

type IsBase64Fn = typeof isBase64;

/**
 * Checks if a string is base64 encoded.
 */
export const IsBase64: (
  ...args: Parameters<IsBase64Fn>
) => ReturnType<IsBase64Fn> = isBase64;
