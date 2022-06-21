import { F } from 'ts-toolbelt';
import { AnyType } from '../common/types';
/**
 * Add method `extends` to the function
 */
export interface SelfExtend<T extends F.Function, Params extends Array<AnyType>> {
    (...args: Parameters<T>): ReturnType<T>;
    extends(...args: Params): SelfExtend<T, Params>;
    extends<TNewFunction extends F.Function, TNewParams extends Array<AnyType>>(...args: TNewParams): SelfExtend<TNewFunction, TNewParams>;
}
