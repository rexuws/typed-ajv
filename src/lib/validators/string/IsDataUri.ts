import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isDateUri = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isDataUri',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_DATA_URI(propertyKey),
      },
    },
    format: {
      name: 'isDataUri',
      type: 'string',
      autoRename: true,
      validate: validator.isDataURI,
    },
  };
});

type IsDataUriFn = typeof isDateUri;

/**
 * Checks if the string is a valid data uri format.
 */
export const IsDataUri: (
  ...args: Parameters<IsDataUriFn>
) => ReturnType<IsDataUriFn> = isDateUri;
