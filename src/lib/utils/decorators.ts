import { C, F, O } from 'ts-toolbelt';

import { MetaStorage } from '../common/MetaStorage';
import { Meta } from '../common/types';

const RUNTIME_TYPE = [
  String,
  Number,
  Boolean,
  Array,
  Object,
  Function,
] as const;
export type RuntimeType = typeof RUNTIME_TYPE[number];

export type TypedClassDecorator<R extends O.Object> = (
  target: C.Class<readonly any[], R>
) => void;

export type TypedPropertyDecorator<R> = <
  K extends string,
  C extends { [k in K]?: R }
>(
  target: C,
  prop: K
) => void;

export const makePropertyDecorator = <
  TProperty,
  TArgFn extends F.Function<never, unknown> = any
>(
  meta: Meta,
  applyFnMeta?: (
    meta: Meta,
    argFn: TArgFn,
    propertyKey: string,
    designType: RuntimeType
  ) => Meta
): F.Function<
  TArgFn extends never ? never : [TArgFn],
  TypedPropertyDecorator<TProperty>
> => {
  return (fn: TArgFn) => (target, key) => {
    const designType = Reflect.getMetadata('design:type', target, key);

    if (applyFnMeta) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      MetaStorage.apply(target, key, applyFnMeta(meta, fn, key, designType));
      return;
    }
    MetaStorage.apply(target, key, meta);
  };
};

export const makeClassDecorator = <TClass>(
  ...args: any[]
): F.Function<never, TypedClassDecorator<TClass>> => {
  console.log(args);

  return () => (target) => {
    console.log(target);
  };
};
