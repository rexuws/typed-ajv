import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isUUID = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'uuid',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_UUID(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is an url.
 */
export const IsUUID = isUUID;
