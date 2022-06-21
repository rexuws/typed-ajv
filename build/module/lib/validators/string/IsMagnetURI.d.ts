import { ValidateErrorMessage } from '../types';
declare const isMagnetURI: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsMagnetURI = typeof isMagnetURI;
/**
 * Check if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).
 */
export declare const IsMagnetURI: (...args: Parameters<IsMagnetURI>) => ReturnType<IsMagnetURI>;
export {};
