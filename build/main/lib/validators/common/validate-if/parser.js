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
exports.constructJSONSchemaWithValidateIf = exports.parseValidateIf = void 0;
const MetaStorage_1 = require("../../../common/MetaStorage");
const constants_1 = require("./constants");
const parseValidateIf = (key, meta, output) => {
    if (!meta.validateIf)
        return;
    if ('validatorName' in meta.validateIf) {
        output.validateIf.push({
            property: key,
            validatorName: meta.validateIf.validatorName,
        });
        return;
    }
    const { validator, dependency } = meta.validateIf;
    output.validateIf.push({
        property: key,
        dependency: dependency || key,
        fn: validator,
    });
    return;
};
exports.parseValidateIf = parseValidateIf;
const getSchemaPropertyOrFail = (schemaProperties, property) => {
    const value = schemaProperties[property];
    if (!value)
        throw new Error(`Property ${property} not found in schema`);
    return [property, value];
};
const convertValidateIfSelfToAllOfElm = (meta, schemaProperties) => {
    const { property, dependency, fn } = meta;
    return [
        dependency,
        {
            fn,
            then: [getSchemaPropertyOrFail(schemaProperties, property)],
        },
        property,
    ];
};
const convertValidateIfRefToAllOfElm = (elmMeta, schemaProperties, namedValidateFunctionsRegistry) => {
    const { property, validatorName } = elmMeta;
    const namedFn = namedValidateFunctionsRegistry[validatorName];
    if (!namedFn) {
        throw new Error(`${validatorName} is not registered`);
    }
    const { dependency, fn } = namedFn;
    return [
        dependency,
        {
            fn,
            then: [getSchemaPropertyOrFail(schemaProperties, property)],
        },
        property,
    ];
};
const mergeAllOf = (allOf, allOfElm, dependency) => {
    if (!allOf[dependency]) {
        return Object.assign(Object.assign({}, allOf), { [dependency]: allOfElm });
    }
    const { then, fn } = allOf[dependency];
    return Object.assign(Object.assign({}, allOf), { [dependency]: {
            fn,
            then: [...then, ...allOfElm.then],
        } });
};
const buildRefValidatorsAllOf = (initAllOf, refValidators, schemaProperties, namedValidateFunctionsRegistry = {}) => {
    return refValidators.reduce(([allOf, visitedProperties], meta) => {
        const [dependency, elm, visitedProperty] = convertValidateIfRefToAllOfElm(meta, schemaProperties, namedValidateFunctionsRegistry);
        return [
            mergeAllOf(allOf, elm, dependency),
            [...visitedProperties, visitedProperty],
        ];
    }, [initAllOf, []]);
};
const buildSelfValidatorsAllOf = (initAllOf, selfValidators, schemaProperties) => {
    return selfValidators.reduce(([allOf, visitedProperties], meta) => {
        const [dependency, elm, visitedProperty] = convertValidateIfSelfToAllOfElm(meta, schemaProperties);
        return [
            mergeAllOf(allOf, elm, dependency),
            [...visitedProperties, visitedProperty],
        ];
    }, [initAllOf, []]);
};
const getRequiredProperties = (allOfRequired, schemaRequired) => {
    return schemaRequired.filter((property) => allOfRequired.includes(property));
};
const buildAllOfSchema = (allOf, schemaRequired) => {
    return Object.entries(allOf).map(([dependency, { fn, then }]) => ({
        if: {
            properties: {
                [dependency]: {
                    validateAny: fn,
                },
            },
        },
        then: {
            properties: Object.fromEntries(then),
            required: getRequiredProperties(then.map((t) => t[0]), schemaRequired),
        },
        else: {
            properties: Object.fromEntries(then.map(([property]) => [
                property,
                {
                    validateAny: (_, data) => {
                        delete data[property];
                        return true;
                    },
                },
            ])),
        },
    }));
};
const constructJSONSchemaWithValidateIf = (schema, parsedMeta, source) => {
    var _a;
    if (!parsedMeta.validateIf || !parsedMeta.validateIf.length)
        return schema;
    const { validateIf } = parsedMeta;
    const validateFunctions = MetaStorage_1.MetaStorage.get(source, constants_1.VALIDATE_FUNCTION, constants_1.VALIDATE_FUNCTION);
    if (!schema.properties)
        return schema;
    const { properties: props } = schema, sch = __rest(schema, ["properties"]);
    const required = (_a = schema.required) !== null && _a !== void 0 ? _a : [];
    const properties = Object.entries(props);
    if (!properties.length)
        return schema;
    const refValidators = validateIf.filter((ifMeta) => 'validatorName' in ifMeta);
    const selfValidators = validateIf.filter((ifMeta) => !('validatorName' in ifMeta));
    const [refsAllOf, visitedRefProperties] = buildRefValidatorsAllOf({}, refValidators, schema.properties, validateFunctions);
    const [selfsAllOf, visitedSelfProperties] = buildSelfValidatorsAllOf({}, selfValidators, schema.properties);
    const refsAllOfSchema = buildAllOfSchema(refsAllOf, required);
    const selfsAllOfSchema = buildAllOfSchema(selfsAllOf, required);
    const newRequired = required.filter((r) => !visitedRefProperties.includes(r) && !visitedSelfProperties.includes(r));
    const newProps = Object.fromEntries(properties.filter(([p]) => !visitedRefProperties.includes(p) && !visitedSelfProperties.includes(p)));
    return Object.assign(Object.assign({}, sch), { required: newRequired, properties: newProps, allOf: [...refsAllOfSchema, ...selfsAllOfSchema], additionalProperties: true });
};
exports.constructJSONSchemaWithValidateIf = constructJSONSchemaWithValidateIf;
