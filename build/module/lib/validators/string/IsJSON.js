import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isJSON = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isJSON',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_JSON(propertyKey),
            },
        },
        format: {
            name: 'isJSON',
            type: 'string',
            validate: validator.isJSON,
        },
    };
});
/**
 * Check if the string is valid JSON (note: uses `JSON.parse`).
 */
export const IsJSON = isJSON;
