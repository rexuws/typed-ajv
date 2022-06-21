import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isDecimal = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.IsDecimalOptions | undefined
>({}, (_, propertyKey, __, opts, arg = {}) => {
  const { errorMessage } = opts;

  const validate = (str: string) => {
    return validator.isDecimal(str, arg);
  };

  return {
    constraint: {
      format: 'isDecimal',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_DECIMAL(propertyKey),
      },
    },
    format: {
      name: 'isDecimal',
      type: 'string',
      validate,
      autoRename: true,
    },
  };
});

type IsDecimalFn = typeof isDecimal;

/**
 * Checks if the string is a decimal number.
 */
export const IsDecimal: (
  ...args: Parameters<IsDecimalFn>
) => ReturnType<IsDecimalFn> = isDecimal;

// IsDecimal({})
