import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const getIsRgbColorValidator = (includePercentValue) => (value) => validator.isRgbColor(value, includePercentValue);
const isRgbColor = makeValidationDecorator({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const formatName = `IsRGB${arg.includePercentValues ? 'includePercentValues' : ''}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_RGB_COLOR(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsRgbColorValidator(!!arg.includePercentValues),
        },
    };
});
/**
 * Check if the string is a rgb or rgba color.
 */
export const IsRgbColor = isRgbColor;
