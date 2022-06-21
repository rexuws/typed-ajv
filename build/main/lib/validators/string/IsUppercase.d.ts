import { ValidateErrorMessage } from '../types';
declare const isUppercase: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsUppercase = typeof isUppercase;
/**
 * Check if the string is uppercase.
 */
export declare const IsUppercase: (...args: Parameters<IsUppercase>) => ReturnType<IsUppercase>;
export {};
