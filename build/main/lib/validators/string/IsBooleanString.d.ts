import { ValidateErrorMessage } from '../types';
declare const isBooleanString: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsBooleanStringFn = typeof isBooleanString;
/**
 * Check if the string is a boolean string (true, false, 0, 1)
 */ export declare const IsBooleanString: (...args: Parameters<IsBooleanStringFn>) => ReturnType<IsBooleanStringFn>;
export {};
