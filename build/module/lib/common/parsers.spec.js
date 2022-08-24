import 'reflect-metadata';
import test from 'ava';
import { Parser } from './parsers';
const meta = {
    constraint: {
        type: 'string',
        format: 'uuid',
    },
    typeDef: {
        isArray: true,
        type: 'string',
    },
    formats: [
        {
            name: 'uuid',
            type: 'string',
            validate() {
                return true;
            },
        },
    ],
};
const meta2 = {
    constraint: {
        type: 'string',
        format: 'uuid',
    },
    typeDef: {
        isArray: true,
        type: 'string',
    },
    formats: [
        {
            name: 'uuid',
            type: 'string',
            validate() {
                return true;
            },
            autoRename: true,
        },
    ],
};
const output = {
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
};
const propertyKey = 'test';
const propertyKey2 = 'test2';
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
    t.deepEqual(output.constraints[propertyKey], {
        type: 'array',
        items: meta.constraint,
    });
});
test('parseFormat must rename format in constraint if autoRename is true and the origin is being used', (t) => {
    const parseOptions = {
        registeredFormats: [],
    };
    Parser.parseConstraint(propertyKey, meta, output, { registeredFormats: [] });
    Parser.parseConstraint(propertyKey2, meta2, output);
    Parser.parseFormat(propertyKey, meta, output, parseOptions);
    Parser.parseFormat(propertyKey2, meta2, output, parseOptions);
    t.deepEqual(output.constraints, {
        test: { type: 'string', format: 'uuid' },
        test2: { type: 'string', format: 'uuid_1' },
    });
    t.deepEqual(output.formats, [
        { name: 'uuid', type: 'string', validate: meta.formats[0].validate },
        { name: 'uuid_1', type: 'string', validate: meta2.formats[0].validate },
    ]);
});
