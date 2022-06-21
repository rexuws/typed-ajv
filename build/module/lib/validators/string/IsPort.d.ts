import { ValidateErrorMessage } from '../types';
declare const isPort: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsNumberPassportNumber = typeof isPort;
/**
 * Check if the string is a valid port number.
 */
export declare const IsPort: (...args: Parameters<IsNumberPassportNumber>) => ReturnType<IsNumberPassportNumber>;
export {};
