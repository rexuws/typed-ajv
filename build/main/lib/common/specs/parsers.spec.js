"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const ava_1 = __importDefault(require("ava"));
const parsers_1 = require("../parsers");
const meta = {
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
const output = {
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
};
const propertyKey = 'test';
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
    console.log((0, util_1.inspect)(output, false, null, true));
    t.deepEqual(output.constraints[propertyKey], {
        type: 'array',
        items: meta.constraint,
    });
});
