import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isUppercase = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isUppercase',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_UPPERCASE(propertyKey),
            },
        },
        format: {
            name: 'isUppercase',
            type: 'string',
            validate: validator.isUppercase,
        },
    };
});
/**
 * Check if the string is uppercase.
 */
export const IsUppercase = isUppercase;
