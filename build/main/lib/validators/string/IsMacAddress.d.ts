import validator from 'validator';
import { ValidateErrorMessage } from '../types';
declare const isMacAddress: (arg: validator.IsMACAddressOptions, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsMacAddress = typeof isMacAddress;
/**
 * Check if the string is a MAC address.
 */
export declare const IsMacAddress: (...args: Parameters<IsMacAddress>) => ReturnType<IsMacAddress>;
export {};
