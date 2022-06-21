import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils';

const maxLength = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  number
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      maxLength: arg,
      errorMessage: {
        maxLength: errorMessage ?? MESSAGE.STRING.MAX_LENGTH(propertyKey, arg),
      },
    },
  };
});

type MaxLengthFn = typeof maxLength;

/**
 * Checks if the string's length is not more than given number.
 */
export const MaxLength: (
  ...args: Parameters<MaxLengthFn>
) => ReturnType<MaxLengthFn> = maxLength;
