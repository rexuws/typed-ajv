import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isISBN10 = (value: string) => validator.isISBN(value, 10);

const isISBN13 = (value: string) => validator.isISBN(value, 13);

const isISBN = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.ISBNVersion
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  const formatName = `isISBN${arg}`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_ISBN(propertyKey, arg),
      },
    },
    format: {
      name: 'isISBN',
      type: 'string',
      validate: formatName === 'isISBN10' ? isISBN10 : isISBN13,
    },
  };
});

type IsISBNFn = typeof isISBN;

/**
 * Check if the string is an ISBN (version 10 or 13).
 */
export const IsISBN: (...args: Parameters<IsISBNFn>) => ReturnType<IsISBNFn> =
  isISBN;
