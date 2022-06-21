import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isJWT = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isJWT',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_JWT(propertyKey),
            },
        },
        format: {
            name: 'isJWT',
            type: 'string',
            validate: validator.isJWT,
        },
    };
});
/**
 * Check if the string is valid JWT token.
 */
export const IsJWT = isJWT;
