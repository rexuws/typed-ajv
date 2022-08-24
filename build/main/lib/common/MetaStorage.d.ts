import type { O } from 'ts-toolbelt';
import type { AnyType, MergedMeta, Meta } from './types';
declare type WarningMessageFn = (target: string) => Readonly<string[]>;
export declare const MetaStorage: {
    apply: <TMeta extends Meta = Meta>(target: O.Object, key: string, meta: any) => void;
    get: <T>(target: O.Object, key: string, prop?: string) => T | undefined;
    getAll: <T_1>(target: O.Object, key: string) => [string, T_1][];
    mergeMeta: <TMeta_1 extends Meta = Meta>(oldMeta: MergedMeta<TMeta_1>, newMeta: TMeta_1) => [MergedMeta<TMeta_1>, WarningMessageFn[]];
    _apply: (target: O.Object, key: string, value: unknown) => void;
    getId: (target: O.Object) => string;
};
export {};
