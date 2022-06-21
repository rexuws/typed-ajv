import { ValidateErrorMessage } from '../types';
declare const isAscii: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsAsciiFn = typeof isAscii;
/**
 * Check if the string contains only ASCII characters
 */ export declare const IsAscii: (...args: Parameters<IsAsciiFn>) => ReturnType<IsAsciiFn>;
export {};
