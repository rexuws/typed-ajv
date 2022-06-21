import { ValidateErrorMessage } from '../types';
declare const isUrl: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsUrlFn = typeof isUrl;
/**
 * Checks if the string is an url.
 */
export declare const IsUrl: (...args: Parameters<IsUrlFn>) => ReturnType<IsUrlFn>;
export {};
