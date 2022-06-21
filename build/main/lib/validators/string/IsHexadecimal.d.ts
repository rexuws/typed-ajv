import { ValidateErrorMessage } from '../types';
declare const isHexadecimal: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsHexadecimalFn = typeof isHexadecimal;
/**
 * Check if the string is a hexadecimal number.
 */
export declare const IsHexadecimal: (...args: Parameters<IsHexadecimalFn>) => ReturnType<IsHexadecimalFn>;
export {};
