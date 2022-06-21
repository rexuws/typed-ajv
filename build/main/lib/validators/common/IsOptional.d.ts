declare const isOptional: (options?: undefined) => import("../../common").TypedPropertyDecorator<any>;
declare type IsOptionalFn = typeof isOptional;
/**
 * Checks if value is missing and if so, ignores all validators.
 */
export declare const IsOptional: (...args: Parameters<IsOptionalFn>) => ReturnType<IsOptionalFn>;
export {};
