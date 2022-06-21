import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const getIsNumberStringValidator = (noSymbol?: boolean) => {
  if (noSymbol) {
    return (value: string) => validator.isNumeric(value);
  }

  return (value: string) => validator.isNumeric(value, { no_symbols: true });
};
const isNumberString = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.IsNumericOptions | undefined
>({}, (_, propertyKey, __, opts, arg = {}) => {
  const { errorMessage } = opts;

  const formatName = `isNumberString_${arg.no_symbols ? 'no_symbols' : ''}`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_NUMBER_STRING(propertyKey),
      },
    },
    format: {
      name: formatName,
      type: 'string',
      validate: getIsNumberStringValidator(arg.no_symbols),
    },
  };
});

type IsNumberStringFn = typeof isNumberString;

/**
 * Check if the string contains only numbers.
 */
export const IsNumberString: (
  ...args: Parameters<IsNumberStringFn>
) => ReturnType<IsNumberStringFn> = isNumberString;
