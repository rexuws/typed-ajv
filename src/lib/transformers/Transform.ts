import { F as _F } from 'ts-toolbelt';

import { MetaStorage } from '../common/MetaStorage';

interface ITransform {
  fn(value: unknown, object: unknown, context?: unknown): unknown;
}

export function Transform<F extends ITransform['fn']>(
  transform: F
): <
  TKey extends string,
  O extends {
    [k in TKey]: ReturnType<F>;
  }
>(
  target: O,
  key: TKey
) => void {
  return (target, key) => {
    MetaStorage.apply(target, key, {
      transform: transform as _F.Function,
    });
  };
}
