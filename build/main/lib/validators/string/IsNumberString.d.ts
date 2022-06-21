import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isNumberString: (arg: validator.IsNumericOptions | undefined, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsNumberStringFn = typeof isNumberString;
/**
 * Check if the string contains only numbers.
 */
export declare const IsNumberString: (...args: Parameters<IsNumberStringFn>) => ReturnType<IsNumberStringFn>;
export {};
