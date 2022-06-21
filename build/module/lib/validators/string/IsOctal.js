import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isOctal = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isOctal',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_OCTAL(propertyKey),
            },
        },
        format: {
            name: 'isOctal',
            type: 'string',
            validate: validator.isOctal,
        },
    };
});
/**
 * Check if the string is a valid octal number.
 */
export const IsOctal = isOctal;
