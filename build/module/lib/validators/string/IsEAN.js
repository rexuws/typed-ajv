import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isEAN = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isEAN',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_EAN(propertyKey),
            },
        },
        format: {
            name: 'isEAN',
            type: 'string',
            validate: validator.isEAN,
        },
    };
});
/**
 * Check if the string is an EAN (European Article Number).
 */
export const IsEAN = isEAN;
