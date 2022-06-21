import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { escapeString } from './utils';

const contains = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  string
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;
  const val = escapeString(arg);

  return {
    constraint: {
      pattern: val,
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.CONTAINS(propertyKey, arg),
      },
    },
  };
});

type ContainFn = typeof contains;

/**
 * Check if the string contains the given string.
 */
export const Contains: (
  ...args: Parameters<ContainFn>
) => ReturnType<ContainFn> = contains;
