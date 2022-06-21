import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isCreditCard = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'creditCard',
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.IS_CREDIT_CARD(propertyKey),
            },
        },
        format: {
            name: 'creditCard',
            type: 'string',
            validate: validator.isCreditCard,
        },
    };
});
/**
 * Checks if the string is a credit card.
 */
export const IsCreditCard = isCreditCard;
