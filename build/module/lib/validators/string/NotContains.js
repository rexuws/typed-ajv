import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
import { escapeString } from './utils';
const notContains = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const val = escapeString(arg);
    return {
        constraint: {
            not: {
                pattern: val,
            },
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
                not: errorMessage ?? MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
            },
        },
    };
});
/**
 * Check if the string does not contain the given string.
 */
export const NotContains = notContains;
