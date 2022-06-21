import { ValidateErrorMessage } from '../types';
declare const isJSON: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsJSON = typeof isJSON;
/**
 * Check if the string is valid JSON (note: uses `JSON.parse`).
 */
export declare const IsJSON: (...args: Parameters<IsJSON>) => ReturnType<IsJSON>;
export {};
