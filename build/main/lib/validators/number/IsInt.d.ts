import { ValidateErrorMessage, ValidateOptions } from '../types';
import { NumberTypeDef } from './types';
declare const isInt: (arg: NumberTypeDef, options?: (ValidateOptions & ValidateErrorMessage) | undefined) => import("../../common").TypedPropertyDecorator<number | number[]>;
declare type IsIntFn = typeof isInt;
/**
 * Check if the string is a valid string
 */
export declare const IsInt: (...args: Parameters<IsIntFn>) => ReturnType<IsIntFn>;
export {};
