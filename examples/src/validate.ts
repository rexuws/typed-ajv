import { inspect } from 'util';

import {
  commonParser,
  constructJSONSchemaWithValidateIf,
  MetaWithValidateIf,
  ParsedValidateIfResult,
  parseValidateIf,
  TypedAjvStorage,
  validateAnyKeyword,
} from 'typed-ajv';

import { Team } from './fixtures/domains';
import { mockInvalidTeam, mockValidTeam } from './fixtures/mock';

const deepLog = (obj: any) => inspect(obj, false, null, true);

const typedAjv = new TypedAjvStorage<
  MetaWithValidateIf,
  ParsedValidateIfResult
>(
  commonParser.extends(
    () => ({
      allowNullables: [[], []],
      constraints: {},
      formats: [],
      types: { definitions: {}, properties: {} },
      validateIf: [],
    }),
    parseValidateIf
  ),
  {
    validateNested: true,
    compileAsync: true,
    ajv: (ajv) => {
      ajv.addKeyword(validateAnyKeyword);
    },
    constructJSONSchemaFns: [constructJSONSchemaWithValidateIf],
  }
);

const { validate } = await typedAjv.compile(Team);

const validTeam = validate(mockValidTeam);

console.log(
  'Validate for => ',
  deepLog(mockValidTeam),
  'is valid:',
  validTeam,
  'errors:',
  deepLog(validate.errors)
);

const invalidTeam = validate(mockInvalidTeam);

console.log(
  'Validate for => ',
  deepLog(mockInvalidTeam),
  'is valid:',
  invalidTeam,
  'errors:',
  deepLog(validate.errors)
);
