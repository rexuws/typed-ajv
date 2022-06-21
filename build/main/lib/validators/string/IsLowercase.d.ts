import { ValidateErrorMessage } from '../types';
declare const isLowercase: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsLowercaseFn = typeof isLowercase;
/**
 * Check if the string is lowercase.
 */
export declare const IsLowercase: (...args: Parameters<IsLowercaseFn>) => ReturnType<IsLowercaseFn>;
export {};
