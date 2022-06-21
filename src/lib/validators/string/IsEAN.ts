import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isEAN = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
      constraint: {
        format: 'isEAN',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_EAN(propertyKey),
        },
      },
      format: {
        name: 'isEAN',
        type: 'string',
        validate: validator.isEAN,
      },
    };
  }
);

type IsEANFn = typeof isEAN;

/**
 * Check if the string is an EAN (European Article Number).
 */
export const IsEAN: (...args: Parameters<IsEANFn>) => ReturnType<IsEANFn> =
  isEAN;
