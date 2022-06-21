import { MESSAGE } from '../message';
import { ValidateErrorMessage, ValidateOptions } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

import { NumberTypeDef } from './types';

const isNumber = makeValidationDecorator<
  number | number[],
  ValidateOptions & ValidateErrorMessage,
  NumberTypeDef
>({}, (_, propertyKey, designType, opts, arg = {}) => {
  return {
    constraint: {
      type: 'number',
      errorMessage: {
        type: opts.errorMessage ?? MESSAGE.NUMBER.IS_NUMBER(propertyKey),
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

type IsNumberFn = typeof isNumber;

/**
 * Check if the string is a valid string
 */
export const IsNumber: (
  ...args: Parameters<IsNumberFn>
) => ReturnType<IsNumberFn> = isNumber;
