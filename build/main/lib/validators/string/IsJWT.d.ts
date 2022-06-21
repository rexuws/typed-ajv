import { ValidateErrorMessage } from '../types';
declare const isJWT: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsJWTFn = typeof isJWT;
/**
 * Check if the string is valid JWT token.
 */
export declare const IsJWT: (...args: Parameters<IsJWTFn>) => ReturnType<IsJWTFn>;
export {};
