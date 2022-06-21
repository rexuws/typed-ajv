import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
import { STRING_PATTERNS } from './utils';
const isAlphanumeric = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            pattern: STRING_PATTERNS.IS_ALPHANUMERIC,
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.IS_ALPHANUMERIC(propertyKey),
            },
        },
    };
});
/**
 * Check if the string contains only alphabetic and numeric characters.
 */
export const IsAlphanumeric = isAlphanumeric;
