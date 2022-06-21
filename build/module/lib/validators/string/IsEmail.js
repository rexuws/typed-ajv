import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isEmail = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'email',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_EMAIL(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is a valid email address.
 */
export const IsEmail = isEmail;
// IsDecimal({})
