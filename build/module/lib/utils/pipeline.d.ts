import { F } from 'ts-toolbelt';
import { SelfExtend } from './function';
declare type PipelineParams<Fn extends F.Function> = [
    pick: (res: ReturnType<Fn>, args: Parameters<Fn>) => Parameters<Fn>,
    ...fns: Fn[]
];
/**
 * Pipe functions of the same type signature together
 *
 * @param pick - Receive the result of the previous function as the first argument, the second is an array of the original arguments passed into the piped function. Return a new
 * array of arguments to be passed into the next function.
 */
export declare const pipeline: <Fn extends F.Function<any, any>>(pick: (res: ReturnType<Fn>, args: Parameters<Fn>) => Parameters<Fn>, ...fns: Fn[]) => SelfExtend<Fn, PipelineParams<Fn>>;
export {};
