import { makeValidationDecorator } from '../../../utils';
const validateIf = makeValidationDecorator({}, (_, __, ___, options, arg) => {
    if (typeof arg === 'string')
        return {
            validateIf: {
                validatorName: arg,
            },
        };
    const { dependency } = options;
    return {
        validateIf: {
            validator: arg,
            dependency,
        },
    };
});
export const ValidateIf = validateIf;
