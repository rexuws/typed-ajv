import { A, O } from 'ts-toolbelt';
import { Meta, TypedPropertyDecorator } from '../../common/types';
declare const RUNTIME_TYPE: readonly [StringConstructor, NumberConstructor, BooleanConstructor, ArrayConstructor, ObjectConstructor, FunctionConstructor];
export declare type RuntimeType = typeof RUNTIME_TYPE[number];
interface MakePropertyDecorator<TOption extends O.Object, TArg = never, TMeta extends Meta = Meta> {
    applyMeta(meta: Meta, property: string, designType: RuntimeType, options: Partial<TOption>): TMeta;
    applyMetaArg(meta: Meta, property: string, designType: RuntimeType, options: Partial<TOption>, arg: TArg): TMeta;
}
/**
 *
 * @param meta
 * @param applyFnMeta
 * @returns A function
 */
export declare function makeValidationDecorator<TProp, TOption, TArg = undefined, TMeta extends Meta = Meta>(meta: TMeta, applyFnMeta?: A.Equals<TArg, undefined> extends 1 ? MakePropertyDecorator<TOption, TArg, TMeta>['applyMeta'] : MakePropertyDecorator<TOption, TArg, TMeta>['applyMetaArg']): A.Equals<TArg, undefined> extends 1 ? (options?: TOption) => TypedPropertyDecorator<TProp> : (arg: TArg, options?: TOption) => TypedPropertyDecorator<TProp>;
export {};
