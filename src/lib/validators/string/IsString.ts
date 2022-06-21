import { MESSAGE } from '../message';
import { ValidateErrorMessage, ValidateOptions } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isString = makeValidationDecorator<
  string | string[],
  ValidateOptions & ValidateErrorMessage
>({}, (_, propertyKey, designType, opts) => {
  return {
    constraint: {
      type: 'string',
      errorMessage: {
        type: opts.errorMessage ?? MESSAGE.STRING.IS_STRING(propertyKey),
      },
    },
    typeDef: {
      type: 'string',
      isArray:
        typeof opts.each === 'boolean' ? opts.each : designType === Array,
      nullable: true,
    },
  };
});

type IsStringFn = typeof isString;

/**
 * Check if the string is a valid string
 */
export const IsString: (
  ...args: Parameters<IsStringFn>
) => ReturnType<IsStringFn> = isString;
