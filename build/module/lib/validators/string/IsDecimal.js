import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isDecimal = makeValidationDecorator({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const validate = (str) => {
        return validator.isDecimal(str, arg);
    };
    return {
        constraint: {
            format: 'isDecimal',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_DECIMAL(propertyKey),
            },
        },
        format: {
            name: 'isDecimal',
            type: 'string',
            validate,
            autoRename: true,
        },
    };
});
/**
 * Checks if the string is a decimal number.
 */
export const IsDecimal = isDecimal;
// IsDecimal({})
