import { ValidateErrorMessage } from '../types';
declare const maxLength: (arg: number, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type MaxLengthFn = typeof maxLength;
/**
 * Checks if the string's length is not more than given number.
 */
export declare const MaxLength: (...args: Parameters<MaxLengthFn>) => ReturnType<MaxLengthFn>;
export {};
