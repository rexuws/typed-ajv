import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const getIsNumberStringValidator = (noSymbol) => {
    if (noSymbol) {
        return (value) => validator.isNumeric(value);
    }
    return (value) => validator.isNumeric(value, { no_symbols: true });
};
const isNumberString = makeValidationDecorator({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const formatName = `isNumberString_${arg.no_symbols ? 'no_symbols' : ''}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_NUMBER_STRING(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsNumberStringValidator(arg.no_symbols),
        },
    };
});
/**
 * Check if the string contains only numbers.
 */
export const IsNumberString = isNumberString;
