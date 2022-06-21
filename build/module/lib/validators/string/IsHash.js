import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const getIsHashValidator = (hash) => (value) => validator.isHash(value, hash);
const isHash = makeValidationDecorator({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const formatName = `isHash${arg}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_HASH(propertyKey, arg),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsHashValidator(arg),
        },
    };
});
/**
 * Check if the string is a hash of type algorithm.
 */
export const IsHash = isHash;
