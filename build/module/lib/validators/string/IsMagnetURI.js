import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isMagnetURI = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isMagnetURI',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_MAGNET_URI(propertyKey),
            },
        },
        format: {
            name: 'isMagnetURI',
            type: 'string',
            validate: validator.isMagnetURI,
        },
    };
});
/**
 * Check if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).
 */
export const IsMagnetURI = isMagnetURI;
