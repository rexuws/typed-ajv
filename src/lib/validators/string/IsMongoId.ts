import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isMongoId = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isMongoId',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_MOBILE_PHONE(propertyKey),
      },
    },
    format: {
      name: 'isMongoId',
      type: 'string',
      validate: validator.isMongoId,
    },
  };
});

type IsMongoIdFn = typeof isMongoId;

/**
 * Check if the string is a valid hex-encoded representation of a [MongoDB ObjectId](http://docs.mongodb.org/manual/reference/object-id/).
 */
export const IsMongoId: (
  ...args: Parameters<IsMongoIdFn>
) => ReturnType<IsMongoIdFn> = isMongoId;
