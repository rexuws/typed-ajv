import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isDateString = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'date',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_DATE_STRING(propertyKey),
      },
    },
  };
});

type IsDateStringFn = typeof isDateString;

/**
 * Checks if the string is a valid ISO 8601 date.
 */
export const IsDateString: (
  ...args: Parameters<IsDateStringFn>
) => ReturnType<IsDateStringFn> = isDateString;
