import { ValidateErrorMessage } from '../types';
declare const isHexColor: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsHexColorFn = typeof isHexColor;
/**
 * Check if the string is a hexadecimal color.
 */
export declare const IsHexColor: (...args: Parameters<IsHexColorFn>) => ReturnType<IsHexColorFn>;
export {};
