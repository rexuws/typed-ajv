import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isPostalCode: (arg: validator.PostalCodeLocale | "any" | undefined, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsPostalCodeFn = typeof isPostalCode;
/**
 * CCheck if the string is a postal code
 */
export declare const IsPostalCode: (...args: Parameters<IsPostalCodeFn>) => ReturnType<IsPostalCodeFn>;
export {};
