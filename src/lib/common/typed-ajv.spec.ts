import 'reflect-metadata';
import test from 'ava';

import { Type } from '../transformers/Type';
import { IsString } from '../validators';

import { commonParser } from './parsers';
import { TypedAjvStorage } from './typed-ajv';

let typedAjv: TypedAjvStorage;

class A {
  @IsString()
  a: string;
}

class B {
  @IsString()
  b: string;

  @Type(A)
  nested: A;
}

class C {
  @IsString()
  c: string;

  @Type(A)
  nested: A[];
}

class Dummy {}

test.beforeEach(() => {
  typedAjv = new TypedAjvStorage(commonParser, {
    compileAsync: true,
    validateNested: true,
  });
});

test('typedAjv.compile should return compiled functions', async (t) => {
  const compiled = await typedAjv.compile(A);

  t.is(typeof compiled, 'object');
  t.is(typeof compiled.serialize, 'function');
  t.is(typeof compiled.parse, 'function');
  t.is(typeof compiled.validate, 'function');
});

test('typedAjv.get should return compiled functions', async (t) => {
  await typedAjv.compile(A);

  const compiled = typedAjv.get(A);

  t.is(typeof compiled, 'object');
  t.is(typeof compiled.serialize, 'function');
  t.is(typeof compiled.parse, 'function');
  t.is(typeof compiled.validate, 'function');
});

test('typedAjv.get should throw error if target is not compiled', (t) => {
  t.throws(
    () => {
      typedAjv.get(Dummy);
    },
    { instanceOf: Error }
  );
});

test('should validate dummy class A', async (t) => {
  const compiledA = await typedAjv.compile(A);

  t.is(compiledA.validate({ a: 'hello world' }), true);
});

test('should validate dummy class B with nested object field', async (t) => {
  const compiledB = await typedAjv.compile(B);

  t.is(compiledB.validate({ b: 'hello world', nested: { a: 'hi' } }), true);
});
test('should validate dummy class C with nested array field', async (t) => {
  const compiledC = await typedAjv.compile(C);

  t.is(compiledC.validate({ c: 'hello world', nested: [{ a: 'test' }] }), true);
});
