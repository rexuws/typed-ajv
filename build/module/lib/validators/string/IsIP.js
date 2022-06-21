import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isIP = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
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
/**
 * Checks if the string is an IP (version 4 or 6).
 */
export const IsIP = isIP;
