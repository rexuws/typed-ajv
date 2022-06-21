import { ValidateErrorMessage } from '../types';
export declare const isAlpha: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsAlphaFn = typeof isAlpha;
/**
 * Check if the string contains only alphabetic characters.
 */
export declare const IsAlpha: (...args: Parameters<IsAlphaFn>) => ReturnType<IsAlphaFn>;
export {};
