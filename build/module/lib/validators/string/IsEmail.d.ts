import { ValidateErrorMessage } from '../types';
declare const isEmail: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsEmailFn = typeof isEmail;
/**
 * Checks if the string is a valid email address.
 */
export declare const IsEmail: (...args: Parameters<IsEmailFn>) => ReturnType<IsEmailFn>;
export {};
