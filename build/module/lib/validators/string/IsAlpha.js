import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
import { STRING_PATTERNS } from './utils';
export const isAlpha = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            pattern: STRING_PATTERNS.IS_ALPHA,
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.IS_ALPHA(propertyKey),
            },
        },
    };
});
/**
 * Check if the string contains only alphabetic characters.
 */
export const IsAlpha = isAlpha;
