import { ValidateErrorMessage } from '../types';
declare const isHSL: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsHSL = typeof isHSL;
/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 */
export declare const IsHSL: (...args: Parameters<IsHSL>) => ReturnType<IsHSL>;
export {};
