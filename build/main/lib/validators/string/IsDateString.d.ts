import { ValidateErrorMessage } from '../types';
declare const isDateString: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsDateStringFn = typeof isDateString;
/**
 * Checks if the string is a valid ISO 8601 date.
 */
export declare const IsDateString: (...args: Parameters<IsDateStringFn>) => ReturnType<IsDateStringFn>;
export {};
