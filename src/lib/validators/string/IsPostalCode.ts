import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const getIsPostalCodeValidator = (
  locale: 'any' | validator.PostalCodeLocale
) => {
  return (value: string) => validator.isPostalCode(value, locale);
};

const isPostalCode = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.PostalCodeLocale | 'any' | undefined
>({}, (_, propertyKey, __, opts, arg = 'any') => {
  const { errorMessage } = opts;

  const formatName = `isNumberString_${arg}`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_POSTAL_CODE(propertyKey),
      },
    },
    format: {
      name: formatName,
      type: 'string',
      validate: getIsPostalCodeValidator(arg),
    },
  };
});

type IsPostalCodeFn = typeof isPostalCode;

/**
 * CCheck if the string is a postal code
 */
export const IsPostalCode: (
  ...args: Parameters<IsPostalCodeFn>
) => ReturnType<IsPostalCodeFn> = isPostalCode;
