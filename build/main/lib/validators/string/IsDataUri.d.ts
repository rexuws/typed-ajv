import { ValidateErrorMessage } from '../types';
declare const isDateUri: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsDataUriFn = typeof isDateUri;
/**
 * Checks if the string is a valid data uri format.
 */
export declare const IsDataUri: (...args: Parameters<IsDataUriFn>) => ReturnType<IsDataUriFn>;
export {};
