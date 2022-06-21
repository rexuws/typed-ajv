import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const getIsMacAddressValidator =
  (noColon = false) =>
  (value: string) =>
    validator.isMACAddress(value, { no_colons: noColon });

const isMacAddress = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  validator.IsMACAddressOptions
>({}, (_, propertyKey, __, opts, arg = {}) => {
  const { errorMessage } = opts;

  const formatName = `isMacAddress${arg.no_colons ? 'NoColons' : ''}`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_MAC_ADDRESS(propertyKey),
      },
    },
    format: {
      name: formatName,
      type: 'string',
      validate: getIsMacAddressValidator(arg.no_colons),
    },
  };
});

type IsMacAddress = typeof isMacAddress;

/**
 * Check if the string is a MAC address.
 */
export const IsMacAddress: (
  ...args: Parameters<IsMacAddress>
) => ReturnType<IsMacAddress> = isMacAddress;
