import test from 'ava';

import { commonParser } from '../../common/parsers';
import { TypedAjvStorage } from '../../common/typed-ajv';

import { IsString } from './IsString';

class User {
  @IsString()
  username: string;
}

class Strings {
  @IsString()
  strs: string[];
}

let typedAjv: TypedAjvStorage;

// test.before.

test.beforeEach('should validate string property', async () => {
  typedAjv = new TypedAjvStorage(commonParser, {
    compileAsync: true,
    validateNested: true,
  });
});

test('should validate string property', (t) => {
  t.notThrows(() => {
    const compiled = typedAjv.get(User);

    const validUser = {
      username: 'test',
    };

    t.is(compiled.validate(validUser), true);
  });
});
test('should validate string[] property', async (t) => {
  await typedAjv.compile(Strings);

  t.notThrows(() => {
    const compiled = typedAjv.get(Strings);

    const validStrings = {
      strs: ['test', 'test2'],
    };

    console.log('log', compiled.validate.toString());

    t.is(compiled.validate(validStrings), true);
  });
});

test('should invalidate non string property', async (t) => {
  await typedAjv.compile(User);

  const compiled = typedAjv.get(User);

  const invalidUser = {
    username: 123,
  };

  const expectError = [
    {
      instancePath: '/username',
      schemaPath: '#/properties/username/type',
      keyword: 'type',
      params: { type: 'string' },
      message: "'username' must be a string",
    },
  ];

  t.is(compiled.validate(invalidUser), false);

  t.deepEqual(compiled.validate.errors, expectError);
});
