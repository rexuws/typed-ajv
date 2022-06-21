import { ValidateErrorMessage } from '../types';
declare const notContains: (arg: string, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type NotContainsFn = typeof notContains;
/**
 * Check if the string does not contain the given string.
 */
export declare const NotContains: (...args: Parameters<NotContainsFn>) => ReturnType<NotContainsFn>;
export {};
