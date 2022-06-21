import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
import { STRING_PATTERNS } from './utils';
const isAscii = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            pattern: STRING_PATTERNS.IS_ASCII,
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.IS_ASCII(propertyKey),
            },
        },
    };
});
/**
 * Check if the string contains only ASCII characters
 */ export const IsAscii = isAscii;
