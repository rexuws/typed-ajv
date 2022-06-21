import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isHexColor = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isHexColor',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_HEX_COLOR(propertyKey),
            },
        },
        format: {
            name: 'isHexColor',
            type: 'string',
            validate: validator.isHexColor,
        },
    };
});
/**
 * Check if the string is a hexadecimal color.
 */
export const IsHexColor = isHexColor;
