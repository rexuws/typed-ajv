import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils';

const minLength = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  number
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      minLength: arg,
      errorMessage: {
        minLength: errorMessage ?? MESSAGE.STRING.MIX_LENGTH(propertyKey, arg),
      },
    },
  };
});

type MinLengthFn = typeof minLength;

/**
 * Checks if the string's length is not less than given number.
 */
export const MinLength: (
  ...args: Parameters<MinLengthFn>
) => ReturnType<MinLengthFn> = minLength;
