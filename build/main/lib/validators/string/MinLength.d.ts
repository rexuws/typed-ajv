import { ValidateErrorMessage } from '../types';
declare const minLength: (arg: number, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type MinLengthFn = typeof minLength;
/**
 * Checks if the string's length is not less than given number.
 */
export declare const MinLength: (...args: Parameters<MinLengthFn>) => ReturnType<MinLengthFn>;
export {};
