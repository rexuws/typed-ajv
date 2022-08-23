import { inspect } from 'util';

import test from 'ava';

import { Parser } from '../parsers';
import { MergedMeta, Meta, ParsedResult } from '../types';

const meta: MergedMeta<Meta> = {
  constraint: {
    type: 'string',
    format: 'uuid',
  },
  typeDef: {
    isArray: true,
    type: 'string',
  },
  formats: [],
};

const output: ParsedResult = {
  allowNullables: [[], []],
  constraints: {},
  formats: [],
  types: { definitions: {}, properties: {} },
};

const propertyKey = 'test';

test.beforeEach(() => {
  Parser.parseConstraint(propertyKey, meta, output);
});

test('must parse constraints', (t) => {
  Parser.parseConstraint(propertyKey, meta, output);

  t.deepEqual(output.constraints[propertyKey], meta.constraint);
});

test('parseTypeDef must update constraint if type def is an array', (t) => {
  Parser.parseConstraint(propertyKey, meta, output);

  Parser.parseTypeDefs(propertyKey, meta, output);

  console.log(inspect(output, false, null, true));

  t.deepEqual(output.constraints[propertyKey], {
    type: 'array',
    items: meta.constraint,
  });
});
