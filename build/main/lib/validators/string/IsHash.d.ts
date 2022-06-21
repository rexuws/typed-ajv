import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isHash: (arg: validator.HashAlgorithm, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsHashFn = typeof isHash;
/**
 * Check if the string is a hash of type algorithm.
 */
export declare const IsHash: (...args: Parameters<IsHashFn>) => ReturnType<IsHashFn>;
export {};
