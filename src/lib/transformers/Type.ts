import { C, O } from 'ts-toolbelt';

import { MetaStorage } from '../common/MetaStorage';

type TypeOptions = {
  validateNested?: boolean;
};

export function Type<T extends O.Object>(
  cls: C.Class<any[], T>,
  options?: TypeOptions
): <
  TKey extends string,
  O extends {
    [k in TKey]: T | T[];
  }
>(
  target: O,
  key: TKey
) => void;

export function Type(
  cls: C.Class,
  typeOptions?: TypeOptions
): (target: O.Object, key: string) => void {
  return (target, key) => {
    const type = Reflect.getMetadata('design:type', target, key);

    const isArray = type === Array;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    MetaStorage.apply(target, key, {
      typeDef: {
        class: cls,
        isArray,
        validateNested: typeOptions?.validateNested,
      },
    });
  };
}
