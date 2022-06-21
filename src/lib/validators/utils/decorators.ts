/* eslint-disable @typescript-eslint/ban-ts-comment */
import { A, O } from 'ts-toolbelt';

import { MetaStorage } from '../../common/MetaStorage';
import { AnyType, Meta, TypedPropertyDecorator } from '../../common/types';

const RUNTIME_TYPE = [
  String,
  Number,
  Boolean,
  Array,
  Object,
  Function,
] as const;

export type RuntimeType = typeof RUNTIME_TYPE[number];

interface MakePropertyDecorator<
  TOption extends O.Object,
  TArg = never,
  TMeta extends Meta = Meta
> {
  applyMeta(
    meta: Meta,
    property: string,
    designType: RuntimeType,
    options: Partial<TOption>
  ): TMeta;

  applyMetaArg(
    meta: Meta,
    property: string,
    designType: RuntimeType,
    options: Partial<TOption>,
    arg: TArg
  ): TMeta;
}

/**
 *
 * @param meta
 * @param applyFnMeta
 * @returns A function
 */
export function makeValidationDecorator<
  TProp,
  TOption,
  TArg = undefined,
  TMeta extends Meta = Meta
>(
  meta: TMeta,
  applyFnMeta?: A.Equals<TArg, undefined> extends 1
    ? MakePropertyDecorator<TOption, TArg, TMeta>['applyMeta']
    : MakePropertyDecorator<TOption, TArg, TMeta>['applyMetaArg']
): A.Equals<TArg, undefined> extends 1
  ? (options?: TOption) => TypedPropertyDecorator<TProp>
  : (arg: TArg, options?: TOption) => TypedPropertyDecorator<TProp> {
  const fn =
    (...args: AnyType[]): TypedPropertyDecorator<TProp> =>
    (target, key) => {
      const designType = Reflect.getMetadata('design:type', target, key);

      const [argOrOptions, options] = args;

      let arg: TArg | undefined = undefined;
      let opts: TOption | undefined = undefined;

      if (options) {
        arg = argOrOptions;
        opts = options;
      } else {
        if (typeof argOrOptions !== 'object') {
          arg = argOrOptions;
        } else if (
          'errorMessage' in argOrOptions ||
          'each' in argOrOptions ||
          'validateNested' in argOrOptions
        ) {
          arg = undefined;
          opts = argOrOptions;
        } else {
          arg = argOrOptions;
        }
      }

      if (applyFnMeta) {
        if (arg !== undefined)
          // @ts-ignore
          return MetaStorage.apply(
            target,
            key,
            applyFnMeta(meta, key, designType, opts ?? {}, arg)
          );

        return MetaStorage.apply(
          target,
          key,
          (<MakePropertyDecorator<TOption>['applyMeta']>applyFnMeta)(
            meta,
            key,
            designType,
            opts ?? {}
          )
        );
      }

      MetaStorage.apply(target, key, meta);
    };

  return fn;
}
