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

class StringCustomMessage {
  @IsString({ errorMessage: 'custom message' })
  str: string;
}

let typedAjv: TypedAjvStorage;

// test.before.

test.beforeEach(() => {
  typedAjv = new TypedAjvStorage(commonParser, {
    compileAsync: true,
    validateNested: true,
  });
});

test('should validate string property', async (t) => {
  await typedAjv.compile(User);

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

test('should invalidate non string property and print custom message', async (t) => {
  await typedAjv.compile(StringCustomMessage);

  const compiled = typedAjv.get(StringCustomMessage);

  const invalid = {
    str: 123,
  };

  const expectError = [
    {
      instancePath: '/str',
      schemaPath: '#/properties/str/type',
      keyword: 'type',
      params: { type: 'string' },
      message: 'custom message',
    },
  ];

  t.is(compiled.validate(invalid), false);

  t.deepEqual(compiled.validate.errors, expectError);
});
