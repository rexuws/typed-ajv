import { ValidateOptions } from '../../../types';
import { ValidateAny } from '../validate-any';
declare const validateIf: (arg: string | ValidateAny, options?: (ValidateOptions & {
    dependency?: string | undefined;
}) | undefined) => import("../../../../common/types").TypedPropertyDecorator<any>;
declare type ValidateIfFn = typeof validateIf;
interface IValidateIf {
    /**
     * Ignores the other validators on a property when the provided condition function returns false.
     *
     * @param validatorName Name of the validator function registered at the top of the class by `@ValidateFunction` (include all parents classes and children classes).
     *
     * Validator function will only be executed once during the validation
     */
    (validatorName: string): ReturnType<ValidateIfFn>;
    /**
     * Ignores the other validators on a property when the provided condition function returns false.
     * @param validatorFunction Function that returns a boolean value.
     *
     * By default, the `validatorFunction` is called with value of the current property which may be inaccurate if the property requires a `not null` validation. In most scenario,
     * you should use the `validateIf` function with the `dependency` option to specify the property that the validatorFunction will be called with.
     *
     * Validator function will be executed every time it is registered during the validation
     */
    (validatorFunction: (...args: Parameters<ValidateAny>) => boolean, options?: Parameters<ValidateIfFn>[1]): ReturnType<ValidateIfFn>;
}
export declare const ValidateIf: IValidateIf;
export {};
