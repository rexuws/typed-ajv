import { makeValidationDecorator } from '../utils';

const required = makeValidationDecorator<any, never>({
  allowEmpty: false,
});

type RequiredFn = typeof required;

/**
 * Return error is value is missing
 *
 * @default true
 */
export const Required: (
  ...args: Parameters<RequiredFn>
) => ReturnType<RequiredFn> = required;
