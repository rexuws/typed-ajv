import { ValidateErrorMessage, ValidateOptions } from '../types';
import { NumberTypeDef } from './types';
declare const isNumber: (arg: NumberTypeDef, options?: (ValidateOptions & ValidateErrorMessage) | undefined) => import("../../common").TypedPropertyDecorator<number | number[]>;
declare type IsNumberFn = typeof isNumber;
/**
 * Check if the string is a valid string
 */
export declare const IsNumber: (...args: Parameters<IsNumberFn>) => ReturnType<IsNumberFn>;
export {};
