import { ValidateErrorMessage } from '../types';
declare type LengthOption = {
    min: number;
    max: number;
};
declare const length: (arg: LengthOption, options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type LengthFn = typeof length;
/**
 * Checks if the string's length falls in a range.
 */
export declare const Length: (...args: Parameters<LengthFn>) => ReturnType<LengthFn>;
export {};
