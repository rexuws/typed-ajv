import { ValidateErrorMessage } from '../types';
declare const isLocale: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsLocaleFn = typeof isLocale;
/**
 * Check if the string is a locale.
 */
export declare const IsLocale: (...args: Parameters<IsLocaleFn>) => ReturnType<IsLocaleFn>;
export {};
