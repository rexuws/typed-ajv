import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isLocale = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isLocale',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_LOCALE(propertyKey),
            },
        },
        format: {
            name: 'isLocale',
            type: 'string',
            validate: validator.isLocale,
        },
    };
});
/**
 * Check if the string is a locale.
 */
export const IsLocale = isLocale;
