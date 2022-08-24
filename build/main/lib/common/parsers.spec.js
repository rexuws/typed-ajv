"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ava_1 = __importDefault(require("ava"));
const parsers_1 = require("./parsers");
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
ava_1.default.beforeEach(() => {
    parsers_1.Parser.parseConstraint(propertyKey, meta, output);
});
(0, ava_1.default)('must parse constraints', (t) => {
    parsers_1.Parser.parseConstraint(propertyKey, meta, output);
    t.deepEqual(output.constraints[propertyKey], meta.constraint);
});
(0, ava_1.default)('parseTypeDef must update constraint if type def is an array', (t) => {
    parsers_1.Parser.parseConstraint(propertyKey, meta, output);
    parsers_1.Parser.parseTypeDefs(propertyKey, meta, output);
    t.deepEqual(output.constraints[propertyKey], {
        type: 'array',
        items: meta.constraint,
    });
});
(0, ava_1.default)('parseFormat must rename format in constraint if autoRename is true and the origin is being used', (t) => {
    const parseOptions = {
        registeredFormats: [],
    };
    parsers_1.Parser.parseConstraint(propertyKey, meta, output, { registeredFormats: [] });
    parsers_1.Parser.parseConstraint(propertyKey2, meta2, output);
    parsers_1.Parser.parseFormat(propertyKey, meta, output, parseOptions);
    parsers_1.Parser.parseFormat(propertyKey2, meta2, output, parseOptions);
    t.deepEqual(output.constraints, {
        test: { type: 'string', format: 'uuid' },
        test2: { type: 'string', format: 'uuid_1' },
    });
    t.deepEqual(output.formats, [
        { name: 'uuid', type: 'string', validate: meta.formats[0].validate },
        { name: 'uuid_1', type: 'string', validate: meta2.formats[0].validate },
    ]);
});
