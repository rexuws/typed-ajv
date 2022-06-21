import { ValidateErrorMessage } from '../types';
declare const isMimeType: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsMimeTypeFn = typeof isMimeType;
/**
 * Check if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format.
 */
export declare const IsMimeType: (...args: Parameters<IsMimeTypeFn>) => ReturnType<IsMimeTypeFn>;
export {};
