import { O } from 'ts-toolbelt';

import { Meta, ParsedResult } from '../../../common/types';

import { ValidateAny } from './validate-any';

export type ValidateIfRef = {
  validatorName: string;
};

export type ValidateIfSelf = {
  dependency?: string;
  validator: ValidateAny;
};

export type ParsedValidateIfSelf = {
  property: string;
  dependency: string;
  fn: ValidateAny;
};

export type ParsedValidateIfRef = {
  property: string;
  validatorName: string;
};

export type ValidateIfMeta = ValidateIfRef | ValidateIfSelf;

export type MetaWithValidateIf = Meta & {
  validateIf?: ValidateIfMeta;
};

export type ParsedValidateIfResult = ParsedResult & {
  validateIf: Array<ParsedValidateIfSelf | ParsedValidateIfRef>;
};

export type NamedValidateFunctionsRegistry = {
  [key: string]: {
    fn: ValidateAny;
    dependency: string;
  };
};

export type AllOfElm = {
  fn: ValidateAny;
  then: [propertyKey: string, propertyConstraints: O.Object][];
};

export type AllOf = {
  [key: string]: AllOfElm;
};

export type AllOfSch = {
  if: {
    properties: {
      [key: string]: {
        validateAny: ValidateAny;
      };
    };
  };
  then: O.Object;
};
