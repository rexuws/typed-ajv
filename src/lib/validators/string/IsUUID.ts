import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isUUID = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'uuid',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_UUID(propertyKey),
        },
      },
    };
  }
);

type IsUUIDFn = typeof isUUID;

/**
 * Checks if the string is an UUID.
 */
export const IsUUID: (...args: Parameters<IsUUIDFn>) => ReturnType<IsUUIDFn> =
  isUUID;
