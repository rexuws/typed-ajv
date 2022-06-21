import { F } from 'ts-toolbelt';

import { AnyType } from '../common/types';

import { SelfExtend } from './function';

type PipelineParams<Fn extends F.Function> = [
  pick: (res: ReturnType<Fn>, args: Parameters<Fn>) => Parameters<Fn>,
  ...fns: Fn[]
];

/**
 * Pipe functions of the same type signature together
 *
 * @param pick - Receive the result of the previous function as the first argument, the second is an array of the original arguments passed into the piped function. Return a new
 * array of arguments to be passed into the next function.
 */
export const pipeline = <Fn extends F.Function>(
  ...args: PipelineParams<Fn>
): SelfExtend<Fn, PipelineParams<Fn>> => {
  const [pick, ...fns] = args;

  if (fns.length === 0)
    throw new TypeError('pipeline requires at least one function');

  if (fns.length === 1) {
    const handler: SelfExtend<Fn, PipelineParams<Fn>> = (...args) =>
      fns[0](...(args as AnyType));
    handler.extends = (newPick: typeof args[0], ...newFns: typeof args[1][]) =>
      pipeline(newPick, ...fns, ...newFns) as AnyType;

    return handler;
  }

  const [fn, ...rest] = fns;

  const handler: SelfExtend<Fn, PipelineParams<Fn>> = (
    ...args: Parameters<Fn>
  ) =>
    rest.reduce<ReturnType<Fn>>(
      (acc, fn) => fn(...(pick(acc, args) as AnyType)),
      fn(...(args as AnyType))
    );

  handler.extends = (newPick: typeof args[0], ...newFns: typeof args[1][]) =>
    pipeline(newPick, ...fns, ...newFns) as AnyType;

  return handler;
};
