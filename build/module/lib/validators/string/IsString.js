import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isString = makeValidationDecorator({}, (_, propertyKey, designType, opts) => {
    return {
        constraint: {
            type: 'string',
            errorMessage: {
                type: opts.errorMessage ?? MESSAGE.STRING.IS_STRING(propertyKey),
            },
        },
        typeDef: {
            type: 'string',
            isArray: typeof opts.each === 'boolean' ? opts.each : designType === Array,
            nullable: true,
        },
    };
});
/**
 * Check if the string is a valid string
 */
export const IsString = isString;
