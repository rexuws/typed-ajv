import { ValidateErrorMessage } from '../types';
declare type IsRgbOptions = {
    includePercentValues?: boolean;
};
declare const isRgbColor: (arg: IsRgbOptions | undefined, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsRgbColorFn = typeof isRgbColor;
/**
 * Check if the string is a rgb or rgba color.
 */
export declare const IsRgbColor: (...args: Parameters<IsRgbColorFn>) => ReturnType<IsRgbColorFn>;
export {};
