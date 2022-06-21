import { ValidateErrorMessage } from '../types';
declare const isEAN: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsEANFn = typeof isEAN;
/**
 * Check if the string is an EAN (European Article Number).
 */
export declare const IsEAN: (...args: Parameters<IsEANFn>) => ReturnType<IsEANFn>;
export {};
