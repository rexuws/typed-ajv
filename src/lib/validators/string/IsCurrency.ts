import { O } from 'ts-toolbelt';
import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isCurrency = makeValidationDecorator<
  string | string[],
  O.AtLeast<ValidateErrorMessage> & {
    currencyOption?: validator.IsCurrencyOptions;
  },
  validator.IsCurrencyOptions
>({}, (_, propertyKey, designType, opts, arg) => {
  const { errorMessage, currencyOption = {} } = opts;

  const currencyOpt = {
    ...arg,
    ...currencyOption,
  };

  const validate = (str: string) => {
    return validator.isCurrency(str, currencyOpt);
  };

  return {
    constraint: {
      format: 'currency',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_CURRENCY(propertyKey),
      },
    },
    format: {
      name: 'currency',
      type: 'string',
      autoRename: true,
      validate,
    },
  };
});

type IsCurrencyFn = typeof isCurrency;

/**
 * Checks if the string is a valid currency amount.
 */
export const IsCurrency: (
  ...args: Parameters<IsCurrencyFn>
) => ReturnType<IsCurrencyFn> = isCurrency;
