import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isUrl = makeValidationDecorator<string | string[], ValidateErrorMessage>(
  {},
  (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;

    return {
      constraint: {
        format: 'uri',
        errorMessage: {
          format: errorMessage ?? MESSAGE.STRING.IS_URL(propertyKey),
        },
      },
    };
  }
);

type IsUrlFn = typeof isUrl;

/**
 * Checks if the string is an url.
 */
export const IsUrl: (...args: Parameters<IsUrlFn>) => ReturnType<IsUrlFn> =
  isUrl;
