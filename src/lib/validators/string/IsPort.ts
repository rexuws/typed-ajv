import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isPort = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'isPort',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_PORT(propertyKey),
        },
      },
      format: {
        name: 'isPort',
        type: 'string',
        validate: validator.isPort,
      },
    };
  }
);

type IsNumberPassportNumber = typeof isPort;

/**
 * Check if the string is a valid port number.
 */
export const IsPort: (
  ...args: Parameters<IsNumberPassportNumber>
) => ReturnType<IsNumberPassportNumber> = isPort;
