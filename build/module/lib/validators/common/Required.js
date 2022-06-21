import { makeValidationDecorator } from '../utils';
const required = makeValidationDecorator({
    allowEmpty: false,
});
/**
 * Return error is value is missing
 *
 * @default true
 */
export const Required = required;
