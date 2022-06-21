import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isUrl = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'uri',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_URL(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is an url.
 */
export const IsUrl = isUrl;
