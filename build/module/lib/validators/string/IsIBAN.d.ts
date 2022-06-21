import { ValidateErrorMessage } from '../types';
declare const isIBAN: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsIBAN = typeof isIBAN;
/**
 * Check if a string is a IBAN (International Bank Account Number).
 */
export declare const IsIBAN: (...args: Parameters<IsIBAN>) => ReturnType<IsIBAN>;
export {};
