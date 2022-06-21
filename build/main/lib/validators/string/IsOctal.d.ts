import { ValidateErrorMessage } from '../types';
declare const isOctal: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsOctalFn = typeof isOctal;
/**
 * Check if the string is a valid octal number.
 */
export declare const IsOctal: (...args: Parameters<IsOctalFn>) => ReturnType<IsOctalFn>;
export {};
