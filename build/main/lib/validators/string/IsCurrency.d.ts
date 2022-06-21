import validator from 'validator';
declare const isCurrency: (arg: validator.IsCurrencyOptions, options?: ({
    errorMessage: string;
} & {
    currencyOption?: validator.IsCurrencyOptions | undefined;
}) | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsCurrencyFn = typeof isCurrency;
/**
 * Checks if the string is a valid currency amount.
 */
export declare const IsCurrency: (...args: Parameters<IsCurrencyFn>) => ReturnType<IsCurrencyFn>;
export {};
