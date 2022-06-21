import { ValidateErrorMessage } from '../types';
declare const isCreditCard: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsCreditCardFn = typeof isCreditCard;
/**
 * Checks if the string is a credit card.
 */
export declare const IsCreditCard: (...args: Parameters<IsCreditCardFn>) => ReturnType<IsCreditCardFn>;
export {};
