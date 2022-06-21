import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isMimeType = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isMimeType',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_MIME_TYPE(propertyKey),
      },
    },
    format: {
      name: 'isMimeType',
      type: 'string',
      validate: validator.isMimeType,
    },
  };
});

type IsMimeTypeFn = typeof isMimeType;

/**
 * Check if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format.
 */
export const IsMimeType: (
  ...args: Parameters<IsMimeTypeFn>
) => ReturnType<IsMimeTypeFn> = isMimeType;
