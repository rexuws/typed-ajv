export type ValidateOptions = {
  /**
   *
   */
  validateNested?: boolean;
  /**
   * Specifies if validated value is an array and each of its items must be validated.
   */
  each?: boolean;
};

export type ValidateErrorMessage = {
  errorMessage?: string;
};

export type ValueWithValidateOptions<T> = ValidateOptions & {
  value: T;
  errorMessage?: string;
  each?: boolean;
};
