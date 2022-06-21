import { C, O } from 'ts-toolbelt';
declare type TypeOptions = {
    validateNested?: boolean;
};
export declare function Type<T extends O.Object>(cls: C.Class<any[], T>, options?: TypeOptions): <TKey extends string, O extends {
    [k in TKey]: T | T[];
}>(target: O, key: TKey) => void;
export {};
