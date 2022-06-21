import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const getIsMacAddressValidator = (noColon = false) => (value) => validator.isMACAddress(value, { no_colons: noColon });
const isMacAddress = makeValidationDecorator({}, (_, propertyKey, __, opts, arg = {}) => {
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
/**
 * Check if the string is a MAC address.
 */
export const IsMacAddress = isMacAddress;
