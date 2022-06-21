export declare type ValidateOptions = {
    /**
     *
     */
    validateNested?: boolean;
    /**
     * Specifies if validated value is an array and each of its items must be validated.
     */
    each?: boolean;
};
export declare type ValidateErrorMessage = {
    errorMessage?: string;
};
export declare type ValueWithValidateOptions<T> = ValidateOptions & {
    value: T;
    errorMessage?: string;
    each?: boolean;
};
