import { ValidateErrorMessage } from '../types';
declare const isBase64: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsBase64Fn = typeof isBase64;
/**
 * Checks if a string is base64 encoded.
 */
export declare const IsBase64: (...args: Parameters<IsBase64Fn>) => ReturnType<IsBase64Fn>;
export {};
