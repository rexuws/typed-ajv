import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isCurrency = makeValidationDecorator({}, (_, propertyKey, designType, opts, arg) => {
    const { errorMessage, currencyOption = {} } = opts;
    const currencyOpt = {
        ...arg,
        ...currencyOption,
    };
    const validate = (str) => {
        return validator.isCurrency(str, currencyOpt);
    };
    return {
        constraint: {
            format: 'currency',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_CURRENCY(propertyKey),
            },
        },
        format: {
            name: 'currency',
            type: 'string',
            autoRename: true,
            validate,
        },
    };
});
/**
 * Checks if the string is a valid currency amount.
 */
export const IsCurrency = isCurrency;
