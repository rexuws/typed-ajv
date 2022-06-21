import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { STRING_PATTERNS } from './utils';

export const isAlpha = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      pattern: STRING_PATTERNS.IS_ALPHA,
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.IS_ALPHA(propertyKey),
      },
    },
  };
});

type IsAlphaFn = typeof isAlpha;

/**
 * Check if the string contains only alphabetic characters.
 */
export const IsAlpha: (
  ...args: Parameters<IsAlphaFn>
) => ReturnType<IsAlphaFn> = isAlpha;
