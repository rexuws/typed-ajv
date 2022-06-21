import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils';
const maxLength = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            maxLength: arg,
            errorMessage: {
                maxLength: errorMessage ?? MESSAGE.STRING.MAX_LENGTH(propertyKey, arg),
            },
        },
    };
});
/**
 * Checks if the string's length is not more than given number.
 */
export const MaxLength = maxLength;
