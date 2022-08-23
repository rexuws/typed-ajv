import { pipeline } from '../utils';
import { MetaStorage } from './MetaStorage';
import { PROP } from './keys';
/**
 * Combine multiple meta visitor functions into a single function
 */
const combineVisitors = (...args) => {
    const [init, ...parsers] = args;
    const pipelinedVisitors = pipeline((_, args) => args, ...parsers);
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
        const { autoRename, ...f } = format;
        if (!autoRename) {
            output.formats.push(format);
            return;
        }
        if (!options?.registeredFormats)
            throw new Error('Missing registeredFormats');
        const registerCount = options.registeredFormats.filter((e) => e.startsWith(f.name)).length;
        const currentCount = output.formats.filter(({ name }) => f.name === name).length;
        const newSuffix = registerCount + currentCount;
        if (newSuffix === 0) {
            output.formats.push(f);
            return;
        }
        const name = `${f.name}_${newSuffix}`;
        if (output.constraints[key]?.format === f.name) {
            output.constraints[key].format = name;
        }
        output.formats.push({ ...f, name });
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
    const { validateNested, ...type } = _type;
    if (meta.transform) {
        type.metadata = { transform: meta.transform };
    }
    output.types.properties[key] = type;
    if (Object.keys(classRefs).length) {
        Object.entries(classRefs).forEach(([refId, cls]) => (output.types.definitions[refId] = cls));
        if (typeof validateNested === 'boolean'
            ? validateNested
            : options?.validateNested) {
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
            items: output.constraints[key],
        };
    }
};
export const commonParser = combineVisitors(() => ({
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
        const ref = MetaStorage.getId(cls);
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
    const props = MetaStorage.getAll(source, PROP);
    if (!props)
        throw new Error('No compile');
    return parseSource(props, options);
};
export const Parser = {
    combineParser: combineVisitors,
    commonParser,
    parse,
    parseConstraint,
    parseFormat,
    parseAllowNullable,
    parseTypeDefs,
};
