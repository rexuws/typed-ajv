import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isSemVer = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'isSemVer',
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_SEM_VER(propertyKey),
      },
    },
    format: {
      name: 'isSemVer',
      type: 'string',
      validate: validator.isSemVer,
    },
  };
});

type IsSemVerFn = typeof isSemVer;

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
export const IsSemver: (
  ...args: Parameters<IsSemVerFn>
) => ReturnType<IsSemVerFn> = isSemVer;
