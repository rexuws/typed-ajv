import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isDateString = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'date',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_DATE_STRING(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is a valid ISO 8601 date.
 */
export const IsDateString = isDateString;
