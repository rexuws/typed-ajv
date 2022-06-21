import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isMobilePhone = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const validate = (value) => validator.isMobilePhone(value, arg, opts);
    return {
        constraint: {
            format: 'isMobilePhone',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_MOBILE_PHONE(propertyKey),
            },
        },
        format: {
            name: 'isMobilePhone',
            type: 'string',
            validate,
            autoRename: true,
        },
    };
});
/**
 * Check if the string is a mobile phone number.
 */
export const IsMobilePhone = isMobilePhone;
