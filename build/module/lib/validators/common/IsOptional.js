import { makeValidationDecorator } from '../utils';
const isOptional = makeValidationDecorator({
    allowEmpty: true,
});
/**
 * Checks if value is missing and if so, ignores all validators.
 */
export const IsOptional = isOptional;
