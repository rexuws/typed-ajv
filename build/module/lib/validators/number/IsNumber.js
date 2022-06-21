import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isNumber = makeValidationDecorator({}, (_, propertyKey, designType, opts, arg = {}) => {
    return {
        constraint: {
            type: 'number',
            errorMessage: {
                type: opts.errorMessage ?? MESSAGE.NUMBER.IS_NUMBER(propertyKey),
            },
        },
        typeDef: {
            type: arg.type ?? 'int32',
            isArray: typeof opts.each === 'boolean' ? opts.each : designType === Array,
            nullable: true,
        },
    };
});
/**
 * Check if the string is a valid string
 */
export const IsNumber = isNumber;
