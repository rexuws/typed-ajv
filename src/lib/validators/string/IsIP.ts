import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

type IPType = 'ipv4' | 'ipv6';

const isIP = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  IPType
>({}, (_, propertyKey, __, opts, arg) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: arg,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_IP(propertyKey, arg),
      },
    },
  };
});

type IsIP = typeof isIP;

/**
 * Checks if the string is an IP (version 4 or 6).
 */
export const IsIP: (...args: Parameters<IsIP>) => ReturnType<IsIP> = isIP;
