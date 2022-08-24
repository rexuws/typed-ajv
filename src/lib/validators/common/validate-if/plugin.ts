import {
  commonParser,
  ITypedAjvParserPlugin,
  ITypedAjvVisitorPlugin,
  ParseSource,
  ParseSourceParams,
} from '../../../common';

import { constructJSONSchemaWithValidateIf, parseValidateIf } from './parser';
import { MetaWithValidateIf, ParsedValidateIfResult } from './types';
import { validateAnyKeyword } from './validate-any';

const initParser = (): ParsedValidateIfResult => ({
  allowNullables: [[], []],
  constraints: {},
  formats: [],
  types: { definitions: {}, properties: {} },
  validateIf: [],
});

const pluginName = 'parseValidateIf';

export const validateIfParserPlugin: ITypedAjvParserPlugin<
  MetaWithValidateIf,
  ParsedValidateIfResult
> = {
  name: pluginName,
  parser: commonParser.extends<
    ParseSource<MetaWithValidateIf, ParsedValidateIfResult>,
    ParseSourceParams<MetaWithValidateIf, ParsedValidateIfResult>
  >(initParser, parseValidateIf),
  ajv: (ajv) => ajv.addKeyword(validateAnyKeyword),
  constructJSONSchemaFns: [constructJSONSchemaWithValidateIf],
};

export const validateIfVisitorPlugin: ITypedAjvVisitorPlugin<
  MetaWithValidateIf,
  ParsedValidateIfResult
> = {
  name: pluginName,
  initParser,
  visitor: parseValidateIf,
  ajv: (ajv) => ajv.addKeyword(validateAnyKeyword),
  constructJSONSchemaFns: [constructJSONSchemaWithValidateIf],
};
