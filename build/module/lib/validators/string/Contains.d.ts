import { ValidateErrorMessage } from '../types';
declare const contains: (arg: string, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type ContainFn = typeof contains;
/**
 * Check if the string contains the given string.
 */
export declare const Contains: (...args: Parameters<ContainFn>) => ReturnType<ContainFn>;
export {};
