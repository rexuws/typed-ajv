import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isIBAN = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'isIBAN',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_IBAN(propertyKey),
        },
      },
      format: {
        name: 'isIBAN',
        type: 'string',
        validate: validator.isIBAN,
      },
    };
  }
);

type IsIBAN = typeof isIBAN;

/**
 * Check if a string is a IBAN (International Bank Account Number).
 */
export const IsIBAN: (...args: Parameters<IsIBAN>) => ReturnType<IsIBAN> =
  isIBAN;
