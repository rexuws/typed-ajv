import type { O } from 'ts-toolbelt';
import type { InsertMeta, MergedMeta, Meta } from './types';
declare type WarningMessageFn = (target: string) => Readonly<string[]>;
export declare const MetaStorage: {
    apply: <TMeta extends Meta = Meta>(target: O.Object, key: string, meta: TMeta | O.AtLeast<O.Required<TMeta, import("ts-toolbelt/out/Any/Key").Key, "flat">, import("ts-toolbelt/out/Any/Keys").Keys<O.Required<TMeta, import("ts-toolbelt/out/Any/Key").Key, "flat">>>) => void;
    get: <T>(target: O.Object, key: string, prop?: string) => T | undefined;
    getAll: <T_1>(target: O.Object, key: string) => [string, T_1][];
    mergeMeta: <TMeta_1 extends Meta = Meta>(oldMeta: MergedMeta<TMeta_1>, newMeta: TMeta_1) => [MergedMeta<TMeta_1>, WarningMessageFn[]];
    _apply: (target: O.Object, key: string, value: unknown) => void;
    getId: (target: O.Object) => string;
};
export {};
