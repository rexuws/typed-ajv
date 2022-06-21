import { ValidateErrorMessage } from '../types';
declare const isSemVer: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsSemVerFn = typeof isSemVer;
/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
export declare const IsSemver: (...args: Parameters<IsSemVerFn>) => ReturnType<IsSemVerFn>;
export {};
