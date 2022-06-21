import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils';

const isBooleanString = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      enum: ['true', 'false', '0', '1'],
      errorMessage: {
        enum: errorMessage ?? MESSAGE.STRING.IS_BOOLEAN_STRING(propertyKey),
      },
    },
  };
});

type IsBooleanStringFn = typeof isBooleanString;

/**
 * Check if the string is a boolean string (true, false, 0, 1)
 */ export const IsBooleanString: (
  ...args: Parameters<IsBooleanStringFn>
) => ReturnType<IsBooleanStringFn> = isBooleanString;
