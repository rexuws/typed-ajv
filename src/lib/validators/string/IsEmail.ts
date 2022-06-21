import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isEmail = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;
  return {
    constraint: {
      format: 'email',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_EMAIL(propertyKey),
      },
    },
  };
});

type IsEmailFn = typeof isEmail;

/**
 * Checks if the string is a valid email address.
 */
export const IsEmail: (
  ...args: Parameters<IsEmailFn>
) => ReturnType<IsEmailFn> = isEmail;

// IsDecimal({})
