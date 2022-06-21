import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils';
const minLength = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            minLength: arg,
            errorMessage: {
                minLength: errorMessage ?? MESSAGE.STRING.MIX_LENGTH(propertyKey, arg),
            },
        },
    };
});
/**
 * Checks if the string's length is not less than given number.
 */
export const MinLength = minLength;
