import { FuncKeywordDefinition } from 'ajv';

import { AnyType } from '../../../common/types';

export interface ValidateAny {
  <A, B, C>(data: A, parentData: B, rootData: C, thisCtx: false): boolean;
  <A, B, C, D>(data: A, parentData: B, rootData: C, thisCtx: D): boolean;
}

export const validateAnyKeyword: FuncKeywordDefinition = {
  keyword: 'validateAny',
  modifying: true,
  schema: true,
  validate(
    this: unknown,
    fn: ValidateAny,
    value: AnyType,
    _: AnyType,
    data: AnyType
  ) {
    return fn(value, data.parentData, data.rootData, this);
  },
  errors: false,
};
