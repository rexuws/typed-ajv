import { C, O } from 'ts-toolbelt';

import { MetaStorage } from '../../../../common/MetaStorage';
import { AnyType } from '../../../../common/types';
import { VALIDATE_FUNCTION } from '../constants';
import { NamedValidateFunctionsRegistry } from '../types';
import { ValidateAny } from '../validate-any';

export const ValidateFunction =
  <
    T extends O.Object,
    R extends O.Object = O.Object,
    D = AnyType,
    K extends keyof T = keyof T
  >(
    name: string,
    dependency: keyof T,
    fn: (data: T[K] | undefined, parentData: T, rootData: R, ctx: D) => boolean
  ) =>
  (target: C.Class<AnyType[], T>): C.Class<AnyType[], T> => {
    const exist = MetaStorage.get<NamedValidateFunctionsRegistry>(
      target,
      VALIDATE_FUNCTION,
      VALIDATE_FUNCTION
    );

    if (exist) {
      exist[name] = {
        dependency: dependency as string,
        fn: fn as ValidateAny,
      };

      return target;
    }

    MetaStorage._apply(target, VALIDATE_FUNCTION, {
      [name]: { dependency: dependency as string, fn: fn as ValidateAny },
    });

    return target;
  };
