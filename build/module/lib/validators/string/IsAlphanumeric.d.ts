import { ValidateErrorMessage } from '../types';
declare const isAlphanumeric: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsAlphanumeric = typeof isAlphanumeric;
/**
 * Check if the string contains only alphabetic and numeric characters.
 */
export declare const IsAlphanumeric: (...args: Parameters<IsAlphanumeric>) => ReturnType<IsAlphanumeric>;
export {};
