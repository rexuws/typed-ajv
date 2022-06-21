declare const required: (options?: undefined) => import("../../common").TypedPropertyDecorator<any>;
declare type RequiredFn = typeof required;
/**
 * Return error is value is missing
 *
 * @default true
 */
export declare const Required: (...args: Parameters<RequiredFn>) => ReturnType<RequiredFn>;
export {};
