import { ValidateErrorMessage } from '../types';
export declare function IsEnum<T>(values: T[], options?: ValidateErrorMessage): <TKey extends string, O extends {
    [k in TKey]: T;
}>(target: O, key: TKey) => void;
