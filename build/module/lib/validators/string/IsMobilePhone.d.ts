import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isMobilePhone: (arg: validator.MobilePhoneLocale | validator.MobilePhoneLocale[] | undefined, options?: (ValidateErrorMessage & validator.IsMobilePhoneOptions) | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsMobilePhoneFn = typeof isMobilePhone;
/**
 * Check if the string is a mobile phone number.
 */
export declare const IsMobilePhone: (...args: Parameters<IsMobilePhoneFn>) => ReturnType<IsMobilePhoneFn>;
export {};
