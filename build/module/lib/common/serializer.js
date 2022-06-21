import { _, CodeGen, str } from 'ajv/dist/ajv';
import { getCompilingSchema, SchemaEnv } from 'ajv/dist/compile';
import { and, getProperty } from 'ajv/dist/compile/codegen';
import { jtdForms } from 'ajv/dist/compile/jtd/types';
import N from 'ajv/dist/compile/names';
import MissingRefError from 'ajv/dist/compile/ref_error';
import { useFunc } from 'ajv/dist/compile/util';
import quote from 'ajv/dist/runtime/quote';
import { isOwnProperty } from 'ajv/dist/vocabularies/code';
import { hasRef } from 'ajv/dist/vocabularies/jtd/ref';
const genSerialize = {
    elements: serializeElements,
    values: serializeValues,
    discriminator: serializeDiscriminator,
    properties: serializeProperties,
    optionalProperties: serializeProperties,
    enum: serializeString,
    type: serializeType,
    ref: serializeRef,
};
export function _compileSerializer(sch) {
    compileSerializer.call(this, sch, sch.schema.definitions || {});
    if (!sch.serialize)
        throw new Error('ajv implementation error');
    return sch.serialize;
}
function compileSerializer(sch, definitions) {
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new CodeGen(this.scope, { es5, lines, ownProperties });
    const serializeName = gen.scopeName('serialize');
    const cxt = {
        self: this,
        gen,
        schema: sch.schema,
        schemaEnv: sch,
        definitions,
        data: N.data,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        sch.serializeName = serializeName;
        gen.func(serializeName, N.data, false, () => {
            gen.let(N.json, str ``);
            serializeCode(cxt);
            gen.return(N.json);
        });
        gen.optimize(this.opts.code.optimize);
        const serializeFuncCode = gen.toString();
        sourceCode = `${gen.scopeRefs(N.scope)}return ${serializeFuncCode}`;
        const makeSerialize = new Function(`${N.scope}`, sourceCode);
        const serialize = makeSerialize(this.scope.get());
        this.scope.value(serializeName, { ref: serialize });
        sch.serialize = serialize;
    }
    catch (e) {
        if (sourceCode)
            this.logger.error('Error compiling serializer, function code:', sourceCode);
        delete sch.serialize;
        delete sch.serializeName;
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
    return sch;
}
function serializeCode(cxt) {
    let form;
    for (const key of jtdForms) {
        if (key in cxt.schema) {
            form = key;
            break;
        }
    }
    serializeNullable(cxt, form ? genSerialize[form] : serializeEmpty);
}
function serializeNullable(cxt, serializeForm) {
    const { gen, schema, data } = cxt;
    if (!schema.nullable)
        return serializeForm(cxt);
    gen.if(_ `${data} === undefined || ${data} === null`, () => gen.add(N.json, _ `"null"`), () => serializeForm(cxt));
}
function serializeElements(cxt) {
    const { gen, schema, data } = cxt;
    gen.add(N.json, str `[`);
    const first = gen.let('first', true);
    gen.forOf('el', data, (el) => {
        addComma(cxt, first);
        serializeCode({ ...cxt, schema: schema.elements, data: el });
    });
    gen.add(N.json, str `]`);
}
function serializeValues(cxt) {
    const { gen, schema, data } = cxt;
    gen.add(N.json, str `{`);
    const first = gen.let('first', true);
    gen.forIn('key', data, (key) => serializeKeyValue(cxt, key, schema.values, first));
    gen.add(N.json, str `}`);
}
function serializeKeyValue(cxt, key, schema, first) {
    const { gen, data } = cxt;
    addComma(cxt, first);
    serializeString({ ...cxt, data: key });
    gen.add(N.json, str `:`);
    const value = gen.const('value', _ `${data}${getProperty(key)}`);
    serializeCode({ ...cxt, schema, data: value });
}
function serializeDiscriminator(cxt) {
    const { gen, schema, data } = cxt;
    const { discriminator } = schema;
    gen.add(N.json, str `{${JSON.stringify(discriminator)}:`);
    const tag = gen.const('tag', _ `${data}${getProperty(discriminator)}`);
    serializeString({ ...cxt, data: tag });
    gen.if(false);
    for (const tagValue in schema.mapping) {
        gen.elseIf(_ `${tag} === ${tagValue}`);
        const sch = schema.mapping[tagValue];
        serializeSchemaProperties({ ...cxt, schema: sch }, discriminator);
    }
    gen.endIf();
    gen.add(N.json, str `}`);
}
function serializeProperties(cxt) {
    const { gen } = cxt;
    gen.add(N.json, str `{`);
    serializeSchemaProperties(cxt);
    gen.add(N.json, str `}`);
}
function serializeSchemaProperties(cxt, discriminator) {
    const { gen, schema, data } = cxt;
    const { properties, optionalProperties } = schema;
    const props = keys(properties);
    const optProps = keys(optionalProperties);
    const allProps = allProperties(props.concat(optProps));
    let first = !discriminator;
    for (const key of props) {
        serializeProperty(key, properties[key], keyValue(key, properties[key]?.metadata?.transform));
    }
    for (const key of optProps) {
        const value = keyValue(key);
        gen.if(and(_ `${value} !== undefined`, isOwnProperty(gen, data, key)), () => serializeProperty(key, optionalProperties[key], value));
    }
    if (schema.additionalProperties) {
        gen.forIn('key', data, (key) => gen.if(isAdditional(key, allProps), () => serializeKeyValue(cxt, key, {}, gen.let('first', first))));
    }
    function keys(ps) {
        return ps ? Object.keys(ps) : [];
    }
    function allProperties(ps) {
        if (discriminator)
            ps.push(discriminator);
        if (new Set(ps).size !== ps.length) {
            throw new Error('JTD: properties/optionalProperties/disciminator overlap');
        }
        return ps;
    }
    function keyValue(key, transformer) {
        if (transformer) {
            return gen.const('value', _ `${useFunc(gen, transformer)}(${data}${getProperty(key)}, ${data})`);
        }
        return gen.const('value', _ `${data}${getProperty(key)}`);
    }
    function serializeProperty(key, propSchema, value) {
        if (first)
            first = false;
        else
            gen.add(N.json, str `,`);
        gen.add(N.json, str `${JSON.stringify(key)}:`);
        serializeCode({ ...cxt, schema: propSchema, data: value });
    }
    function isAdditional(key, ps) {
        return ps.length ? and(...ps.map((p) => _ `${key} !== ${p}`)) : true;
    }
}
function serializeType(cxt) {
    const { gen, schema, data } = cxt;
    switch (schema.type) {
        case 'boolean':
            gen.add(N.json, _ `${data} ? "true" : "false"`);
            break;
        case 'string':
            serializeString(cxt);
            break;
        case 'timestamp':
            gen.if(_ `${data} instanceof Date`, () => gen.add(N.json, _ `'"' + ${data}.toISOString() + '"'`), () => serializeString(cxt));
            break;
        default:
            serializeNumber(cxt);
    }
}
function serializeString({ gen, data }) {
    gen.add(N.json, _ `${useFunc(gen, quote)}(${data})`);
}
function serializeNumber({ gen, data }) {
    gen.add(N.json, _ `"" + ${data}`);
}
function serializeRef(cxt) {
    const { gen, self, data, definitions, schema, schemaEnv } = cxt;
    const { ref } = schema;
    const refSchema = definitions[ref];
    if (!refSchema)
        throw new MissingRefError(self.opts.uriResolver, '', ref, `No definition ${ref}`);
    if (!hasRef(refSchema))
        return serializeCode({ ...cxt, schema: refSchema });
    const { root } = schemaEnv;
    const sch = compileSerializer.call(self, new SchemaEnv({ schema: refSchema, root }), definitions);
    gen.add(N.json, _ `${getSerialize(gen, sch)}(${data})`);
}
function getSerialize(gen, sch) {
    return sch.serialize
        ? gen.scopeValue('serialize', { ref: sch.serialize })
        : _ `${gen.scopeValue('wrapper', { ref: sch })}.serialize`;
}
function serializeEmpty({ gen, data }) {
    gen.add(N.json, _ `JSON.stringify(${data})`);
}
function addComma({ gen }, first) {
    gen.if(first, () => gen.assign(first, false), () => gen.add(N.json, str `,`));
}
