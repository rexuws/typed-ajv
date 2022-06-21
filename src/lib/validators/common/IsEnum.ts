import { MetaStorage } from '../../common/MetaStorage';
import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';

export function IsEnum<T>(
  values: T[],
  options?: ValidateErrorMessage
): <
  TKey extends string,
  O extends {
    [k in TKey]: T;
  }
>(
  target: O,
  key: TKey
) => void {
  return (target, key) => {
    MetaStorage.apply(target, key, {
      constraint: {
        enum: values,
        errorMessage: {
          enum: options?.errorMessage ?? MESSAGE.PROP.IS_ENUM(values),
        },
      },
    });
  };
}
