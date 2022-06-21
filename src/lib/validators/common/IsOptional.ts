import { makeValidationDecorator } from '../utils';

const isOptional = makeValidationDecorator<any, never>({
  allowEmpty: true,
});

type IsOptionalFn = typeof isOptional;

/**
 * Checks if value is missing and if so, ignores all validators.
 */
export const IsOptional: (
  ...args: Parameters<IsOptionalFn>
) => ReturnType<IsOptionalFn> = isOptional;
