import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isJSON = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'isJSON',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_JSON(propertyKey),
        },
      },
      format: {
        name: 'isJSON',
        type: 'string',
        validate: validator.isJSON,
      },
    };
  }
);

type IsJSON = typeof isJSON;

/**
 * Check if the string is valid JSON (note: uses `JSON.parse`).
 */
export const IsJSON: (...args: Parameters<IsJSON>) => ReturnType<IsJSON> =
  isJSON;
