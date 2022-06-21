import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isHSL = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isHSL',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_HSL(propertyKey),
            },
        },
        format: {
            name: 'isHSL',
            type: 'string',
            validate: validator.isHSL,
        },
    };
});
/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 */
export const IsHSL = isHSL;
