import { C, F, O } from 'ts-toolbelt';
import { Meta } from '../common/types';
declare const RUNTIME_TYPE: readonly [StringConstructor, NumberConstructor, BooleanConstructor, ArrayConstructor, ObjectConstructor, FunctionConstructor];
export declare type RuntimeType = typeof RUNTIME_TYPE[number];
export declare type TypedClassDecorator<R extends O.Object> = (target: C.Class<readonly any[], R>) => void;
export declare type TypedPropertyDecorator<R> = <K extends string, C extends {
    [k in K]?: R;
}>(target: C, prop: K) => void;
export declare const makePropertyDecorator: <TProperty, TArgFn extends F.Function<never, unknown> = any>(meta: Meta, applyFnMeta?: ((meta: Meta, argFn: TArgFn, propertyKey: string, designType: RuntimeType) => Meta) | undefined) => F.Function<TArgFn extends never ? never : [TArgFn], TypedPropertyDecorator<TProperty>>;
export declare const makeClassDecorator: <TClass>(...args: any[]) => F.Function<never, TypedClassDecorator<TClass>>;
export {};
