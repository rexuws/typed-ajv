import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
import { escapeString } from './utils';
const contains = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const val = escapeString(arg);
    return {
        constraint: {
            pattern: val,
            errorMessage: {
                pattern: errorMessage ?? MESSAGE.STRING.CONTAINS(propertyKey, arg),
            },
        },
    };
});
/**
 * Check if the string contains the given string.
 */
export const Contains = contains;
