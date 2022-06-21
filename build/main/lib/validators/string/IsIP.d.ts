import { ValidateErrorMessage } from '../types';
declare type IPType = 'ipv4' | 'ipv6';
declare const isIP: (arg: IPType, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsIP = typeof isIP;
/**
 * Checks if the string is an IP (version 4 or 6).
 */
export declare const IsIP: (...args: Parameters<IsIP>) => ReturnType<IsIP>;
export {};
