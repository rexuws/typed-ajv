import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isHexadecimal = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isHexadecimal',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_HEXADECIMAL(propertyKey),
            },
        },
        format: {
            name: 'isHexadecimal',
            type: 'string',
            validate: validator.isHexadecimal,
        },
    };
});
/**
 * Check if the string is a hexadecimal number.
 */
export const IsHexadecimal = isHexadecimal;
