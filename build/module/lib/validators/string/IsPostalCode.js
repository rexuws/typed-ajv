import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const getIsPostalCodeValidator = (locale) => {
    return (value) => validator.isPostalCode(value, locale);
};
const isPostalCode = makeValidationDecorator({}, (_, propertyKey, __, opts, arg = 'any') => {
    const { errorMessage } = opts;
    const formatName = `isNumberString_${arg}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_POSTAL_CODE(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsPostalCodeValidator(arg),
        },
    };
});
/**
 * CCheck if the string is a postal code
 */
export const IsPostalCode = isPostalCode;
