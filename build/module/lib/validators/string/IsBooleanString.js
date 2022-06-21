import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils';
const isBooleanString = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            enum: ['true', 'false', '0', '1'],
            errorMessage: {
                enum: errorMessage ?? MESSAGE.STRING.IS_BOOLEAN_STRING(propertyKey),
            },
        },
    };
});
/**
 * Check if the string is a boolean string (true, false, 0, 1)
 */ export const IsBooleanString = isBooleanString;
