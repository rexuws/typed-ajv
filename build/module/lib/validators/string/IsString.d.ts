import { ValidateErrorMessage, ValidateOptions } from '../types';
declare const isString: (options?: (ValidateOptions & ValidateErrorMessage) | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsStringFn = typeof isString;
/**
 * Check if the string is a valid string
 */
export declare const IsString: (...args: Parameters<IsStringFn>) => ReturnType<IsStringFn>;
export {};
