import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isMobilePhone = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage & validator.IsMobilePhoneOptions,
  validator.MobilePhoneLocale | validator.MobilePhoneLocale[] | undefined
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  const validate = (value: string) => validator.isMobilePhone(value, arg, opts);

  return {
    constraint: {
      format: 'isMobilePhone',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_MOBILE_PHONE(propertyKey),
      },
    },
    format: {
      name: 'isMobilePhone',
      type: 'string',
      validate,
      autoRename: true,
    },
  };
});

type IsMobilePhoneFn = typeof isMobilePhone;

/**
 * Check if the string is a mobile phone number.
 */
export const IsMobilePhone: (
  ...args: Parameters<IsMobilePhoneFn>
) => ReturnType<IsMobilePhoneFn> = isMobilePhone;
