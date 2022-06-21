import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isPort = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isPort',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_PORT(propertyKey),
            },
        },
        format: {
            name: 'isPort',
            type: 'string',
            validate: validator.isPort,
        },
    };
});
/**
 * Check if the string is a valid port number.
 */
export const IsPort = isPort;
