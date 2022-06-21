import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isJWT = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'isJWT',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_JWT(propertyKey),
        },
      },
      format: {
        name: 'isJWT',
        type: 'string',
        validate: validator.isJWT,
      },
    };
  }
);

type IsJWTFn = typeof isJWT;

/**
 * Check if the string is valid JWT token.
 */
export const IsJWT: (...args: Parameters<IsJWTFn>) => ReturnType<IsJWTFn> =
  isJWT;
