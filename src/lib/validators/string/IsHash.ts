import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const getIsHashValidator = (hash: validator.HashAlgorithm) => (value: string) =>
  validator.isHash(value, hash);

const isHash = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.HashAlgorithm
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  const formatName = `isHash${arg}`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_HASH(propertyKey, arg),
      },
    },
    format: {
      name: formatName,
      type: 'string',
      validate: getIsHashValidator(arg),
    },
  };
});

type IsHashFn = typeof isHash;

/**
 * Check if the string is a hash of type algorithm.
 */
export const IsHash: (...args: Parameters<IsHashFn>) => ReturnType<IsHashFn> =
  isHash;
