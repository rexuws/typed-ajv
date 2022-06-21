import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils';

type LengthOption = {
  min: number;
  max: number;
};

const length = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  LengthOption
>({}, (_, propertyKey, __, opts, arg) => {
  const { max, min } = arg;

  const { errorMessage } = opts;

  return {
    constraint: {
      minLength: min,
      maxLength: max,
      errorMessage: {
        minLength: errorMessage ?? MESSAGE.STRING.MIX_LENGTH(propertyKey, min),
        maxLength: errorMessage ?? MESSAGE.STRING.MAX_LENGTH(propertyKey, max),
      },
    },
  };
});

type LengthFn = typeof length;

/**
 * Checks if the string's length falls in a range.
 */
export const Length: (...args: Parameters<LengthFn>) => ReturnType<LengthFn> =
  length;
