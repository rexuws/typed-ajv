import { C } from 'ts-toolbelt';
import { AnyType } from '../../../../common/types';
export declare const ValidateFunction: <T extends {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}, R extends {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
} = {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}, D = any, K extends keyof T = keyof T>(name: string, dependency: keyof T, fn: (data: T[K] | undefined, parentData: T, rootData: R, ctx: D) => boolean) => (target: C.Class<any[], T>) => C.Class<any[], T>;
