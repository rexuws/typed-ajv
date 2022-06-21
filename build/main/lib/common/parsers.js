"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.commonParser = void 0;
const utils_1 = require("../utils");
const MetaStorage_1 = require("./MetaStorage");
const keys_1 = require("./keys");
/**
 * Combine multiple meta visitor functions into a single function
 */
const combineVisitors = (...args) => {
    const [init, ...parsers] = args;
    const pipelinedVisitors = (0, utils_1.pipeline)((_, args) => args, ...parsers);
    const fn = (props, options) => {
        const parsedResult = init();
        props.map(([key, meta]) => pipelinedVisitors(key, meta, parsedResult, options));
        return parsedResult;
    };
    fn.extends = (newInit, ...visitors) => combineVisitors(newInit, ...parsers, ...visitors);
    return fn;
};
const parseConstraint = (key, meta, output) => {
    if (!meta.constraint)
        return;
    output.constraints[key] = meta.constraint;
    return;
};
const parseFormat = (key, meta, output, options) => {
    if (!meta.formats) {
        return;
    }
    meta.formats.forEach((format) => {
        var _a;
        const { autoRename } = format, f = __rest(format, ["autoRename"]);
        if (!autoRename) {
            output.formats.push(format);
            return;
        }
        if (!(options === null || options === void 0 ? void 0 : options.registeredFormats))
            throw new Error('Missing registeredFormats');
        const registerCount = options.registeredFormats.filter((e) => e.startsWith(f.name)).length;
        const currentCount = output.formats.filter(({ name }) => f.name === name).length;
        const newSuffix = registerCount + currentCount;
        if (newSuffix === 0) {
            output.formats.push(f);
            return;
        }
        const name = `${f.name}_${newSuffix}`;
        if (((_a = output.constraints[key]) === null || _a === void 0 ? void 0 : _a.format) === f.name) {
            output.constraints[key].format = name;
        }
        output.formats.push(Object.assign(Object.assign({}, f), { name }));
    });
};
const parseAllowNullable = (key, meta, output) => {
    if (meta.allowEmpty) {
        output.allowNullables[0].push(key);
        return;
    }
    output.allowNullables[1].push(key);
};
const parseTypeDefs = (key, meta, output, options) => {
    if (!meta.typeDef)
        return;
    const [_type, classRefs] = _parseTypeDef(meta.typeDef);
    const { validateNested } = _type, type = __rest(_type, ["validateNested"]);
    if (meta.transform) {
        type.metadata = { transform: meta.transform };
    }
    output.types.properties[key] = type;
    if (Object.keys(classRefs).length) {
        Object.entries(classRefs).forEach(([refId, cls]) => (output.types.definitions[refId] = cls));
        if (typeof validateNested === 'boolean'
            ? validateNested
            : options === null || options === void 0 ? void 0 : options.validateNested) {
            if (type.elements) {
                output.constraints[key] = {
                    type: 'array',
                    items: {
                        $ref: type.elements.ref,
                    },
                };
                return;
            }
            output.constraints[key] = {
                $ref: Object.keys(classRefs)[0],
            };
            return;
        }
        output.constraints[key] = {
            type: 'object',
            nullable: true,
        };
        return;
    }
    if (type.elements) {
        output.constraints[key] = {
            type: 'array',
            items: {
                type: type.elements.type,
            },
        };
    }
};
exports.commonParser = combineVisitors(() => ({
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
}), parseConstraint, parseFormat, parseAllowNullable, parseTypeDefs);
const _parseTypeDef = (typeDef) => {
    const type = {};
    const classRefs = {};
    if (typeDef.class) {
        const { class: cls, validateNested } = typeDef;
        const ref = MetaStorage_1.MetaStorage.getId(cls);
        classRefs[ref] = cls;
        type.validateNested = validateNested;
        if (typeDef.isArray) {
            type.elements = {
                ref: ref,
            };
            type.nullable = true;
        }
        else {
            type.ref = ref;
        }
    }
    if (typeDef.type) {
        const { type: _type } = typeDef;
        if (typeDef.isArray) {
            type.elements = {
                type: _type,
            };
            type.nullable = true;
        }
        else {
            type.type = _type;
        }
    }
    if (typeDef.nullable) {
        type.nullable = true;
    }
    return [type, classRefs];
};
const parse = (source, parseSource, options) => {
    const props = MetaStorage_1.MetaStorage.getAll(source, keys_1.PROP);
    if (!props)
        throw new Error('No compile');
    return parseSource(props, options);
};
exports.Parser = {
    combineParser: combineVisitors,
    commonParser: exports.commonParser,
    parse,
    parseConstraint,
    parseFormat,
    parseAllowNullable,
    parseTypeDefs,
};
