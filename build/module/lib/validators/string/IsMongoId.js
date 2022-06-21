import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isMongoId = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isMongoId',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_MOBILE_PHONE(propertyKey),
            },
        },
        format: {
            name: 'isMongoId',
            type: 'string',
            validate: validator.isMongoId,
        },
    };
});
/**
 * Check if the string is a valid hex-encoded representation of a [MongoDB ObjectId](http://docs.mongodb.org/manual/reference/object-id/).
 */
export const IsMongoId = isMongoId;
