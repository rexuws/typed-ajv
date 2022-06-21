import { ValidateErrorMessage } from '../types';
declare const isBase32: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsBase32Fn = typeof isBase32;
/**
 * Check if a string is a valid base32 string
 */
export declare const IsBase32: (...args: Parameters<IsBase32Fn>) => ReturnType<IsBase32Fn>;
export {};
