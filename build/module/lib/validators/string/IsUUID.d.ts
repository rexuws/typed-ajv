import { ValidateErrorMessage } from '../types';
declare const isUUID: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsUUIDFn = typeof isUUID;
/**
 * Checks if the string is an url.
 */
export declare const IsUUID: (...args: Parameters<IsUUIDFn>) => ReturnType<IsUUIDFn>;
export {};
