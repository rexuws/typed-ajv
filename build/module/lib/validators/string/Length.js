import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils';
const length = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { max, min } = arg;
    const { errorMessage } = opts;
    return {
        constraint: {
            minLength: min,
            maxLength: max,
            errorMessage: {
                minLength: errorMessage ?? MESSAGE.STRING.MIX_LENGTH(propertyKey, min),
                maxLength: errorMessage ?? MESSAGE.STRING.MAX_LENGTH(propertyKey, max),
            },
        },
    };
});
/**
 * Checks if the string's length falls in a range.
 */
export const Length = length;
