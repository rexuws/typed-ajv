import { inspect } from 'util';

import { TypedAjvBuilder, validateIfVisitorPlugin } from 'typed-ajv';

import { Team } from './fixtures/domains';
import { mockInvalidTeam, mockValidTeam } from './fixtures/mock';

const deepLog = (obj: any) => inspect(obj, false, null, true);

const typedAjv = new TypedAjvBuilder()
  .usePlugin(validateIfVisitorPlugin) //.usePlugin(validateIfParserPlugin)
  .useOptions({ compileAsync: true, validateNested: true })
  .build();

const { validate } = await typedAjv.compile(Team);

const validTeam = validate(mockValidTeam);

console.log(deepLog(validate.schema));

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
