import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isDecimal: (arg: validator.IsDecimalOptions | undefined, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsDecimalFn = typeof isDecimal;
/**
 * Checks if the string is a decimal number.
 */
export declare const IsDecimal: (...args: Parameters<IsDecimalFn>) => ReturnType<IsDecimalFn>;
export {};
