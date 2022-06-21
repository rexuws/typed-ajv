import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { escapeString } from './utils';

const notContains = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  string
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;
  const val = escapeString(arg);

  return {
    constraint: {
      not: {
        pattern: val,
      },
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
        not: errorMessage ?? MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
      },
    },
  };
});

type NotContainsFn = typeof notContains;

/**
 * Check if the string does not contain the given string.
 */
export const NotContains: (
  ...args: Parameters<NotContainsFn>
) => ReturnType<NotContainsFn> = notContains;
