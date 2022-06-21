import { MESSAGE } from '../message';
import { ValidateErrorMessage, ValidateOptions } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { NumberTypeDef } from './types';

const isInt = makeValidationDecorator<
  number | number[],
  ValidateOptions & ValidateErrorMessage,
  NumberTypeDef
>({}, (_, propertyKey, designType, opts, arg = {}) => {
  return {
    constraint: {
      type: 'integer',
      errorMessage: {
        type: opts.errorMessage ?? MESSAGE.NUMBER.IS_INT(propertyKey),
      },
    },
    typeDef: {
      type: arg.type ?? 'int32',
      isArray:
        typeof opts.each === 'boolean' ? opts.each : designType === Array,
      nullable: true,
    },
  };
});

type IsIntFn = typeof isInt;

/**
 * Check if the string is a valid string
 */
export const IsInt: (...args: Parameters<IsIntFn>) => ReturnType<IsIntFn> =
  isInt;
