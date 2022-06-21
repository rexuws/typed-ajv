import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isISBN: (arg: validator.ISBNVersion, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsISBNFn = typeof isISBN;
/**
 * Check if the string is an ISBN (version 10 or 13).
 */
export declare const IsISBN: (...args: Parameters<IsISBNFn>) => ReturnType<IsISBNFn>;
export {};
