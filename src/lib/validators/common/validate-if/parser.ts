import { JSONSchemaType } from 'ajv';
import { O } from 'ts-toolbelt';

import { MetaStorage } from '../../../common/MetaStorage';
import {
  AnyType,
  ConstructJSONSchema,
  MetaVisitor,
} from '../../../common/types';

import { VALIDATE_FUNCTION } from './constants';
import {
  AllOf,
  AllOfElm,
  AllOfSch,
  MetaWithValidateIf,
  NamedValidateFunctionsRegistry,
  ParsedValidateIfRef,
  ParsedValidateIfResult,
  ParsedValidateIfSelf,
} from './types';

export const parseValidateIf: MetaVisitor<
  MetaWithValidateIf,
  ParsedValidateIfResult
> = (key, meta, output) => {
  if (!meta.validateIf) return;

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

const getSchemaPropertyOrFail = (
  schemaProperties: O.Object,
  property: string
): [property: string, propertyConstraints: O.Object] => {
  const value = schemaProperties[property];

  if (!value) throw new Error(`Property ${property} not found in schema`);

  return [property, value];
};

const convertValidateIfSelfToAllOfElm = (
  meta: ParsedValidateIfSelf,
  schemaProperties: O.Object
): [dependency: string, elm: AllOfElm, visitedProperty: string] => {
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

const convertValidateIfRefToAllOfElm = (
  elmMeta: ParsedValidateIfRef,
  schemaProperties: O.Object,
  namedValidateFunctionsRegistry: NamedValidateFunctionsRegistry
): [dependency: string, elm: AllOfElm, visitedProperty: string] => {
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

const mergeAllOf = (
  allOf: AllOf,
  allOfElm: AllOfElm,
  dependency: string
): AllOf => {
  if (!allOf[dependency]) {
    return {
      ...allOf,
      [dependency]: allOfElm,
    };
  }

  const { then, fn } = allOf[dependency];

  return {
    ...allOf,
    [dependency]: {
      fn,
      then: [...then, ...allOfElm.then],
    },
  };
};

const buildRefValidatorsAllOf = (
  initAllOf: AllOf,
  refValidators: ParsedValidateIfRef[],
  schemaProperties: O.Object,
  namedValidateFunctionsRegistry: NamedValidateFunctionsRegistry = {}
): [allOf: AllOf, visitedProperties: string[]] => {
  return refValidators.reduce(
    ([allOf, visitedProperties], meta) => {
      const [dependency, elm, visitedProperty] = convertValidateIfRefToAllOfElm(
        meta,
        schemaProperties,
        namedValidateFunctionsRegistry
      );

      return [
        mergeAllOf(allOf, elm, dependency),
        [...visitedProperties, visitedProperty],
      ];
    },
    [initAllOf, [] as string[]]
  );
};

const buildSelfValidatorsAllOf = (
  initAllOf: AllOf,
  selfValidators: ParsedValidateIfSelf[],
  schemaProperties: O.Object
): [allOf: AllOf, visitedProperties: string[]] => {
  return selfValidators.reduce(
    ([allOf, visitedProperties], meta) => {
      const [dependency, elm, visitedProperty] =
        convertValidateIfSelfToAllOfElm(meta, schemaProperties);

      return [
        mergeAllOf(allOf, elm, dependency),
        [...visitedProperties, visitedProperty],
      ];
    },
    [initAllOf, [] as string[]]
  );
};

const getRequiredProperties = (
  allOfRequired: string[],
  schemaRequired: string[]
) => {
  return schemaRequired.filter((property) => allOfRequired.includes(property));
};

const buildAllOfSchema = (
  allOf: AllOf,
  schemaRequired: string[]
): AllOfSch[] => {
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
      required: getRequiredProperties(
        then.map((t) => t[0]),
        schemaRequired
      ),
    },
    else: {
      properties: Object.fromEntries(
        then.map(([property]) => [
          property,
          {
            validateAny: (_: AnyType, data: AnyType) => {
              delete data[property];
              return true;
            },
          },
        ])
      ),
    },
  }));
};

export const constructJSONSchemaWithValidateIf: ConstructJSONSchema<
  ParsedValidateIfResult
> = (schema, parsedMeta, source) => {
  if (!parsedMeta.validateIf || !parsedMeta.validateIf.length) return schema;

  const { validateIf } = parsedMeta;

  const validateFunctions = MetaStorage.get<NamedValidateFunctionsRegistry>(
    source,
    VALIDATE_FUNCTION,
    VALIDATE_FUNCTION
  );

  if (!schema.properties) return schema;

  const { properties: props, ...sch } = schema;

  const required: string[] = schema.required ?? [];

  const properties = Object.entries(props);

  if (!properties.length) return schema;

  const refValidators = validateIf.filter(
    (ifMeta): ifMeta is ParsedValidateIfRef => 'validatorName' in ifMeta
  );

  const selfValidators = validateIf.filter(
    (ifMeta): ifMeta is ParsedValidateIfSelf => !('validatorName' in ifMeta)
  );

  const [refsAllOf, visitedRefProperties] = buildRefValidatorsAllOf(
    {},
    refValidators,
    schema.properties,
    validateFunctions
  );

  const [selfsAllOf, visitedSelfProperties] = buildSelfValidatorsAllOf(
    {},
    selfValidators,
    schema.properties
  );

  const refsAllOfSchema = buildAllOfSchema(refsAllOf, required);
  const selfsAllOfSchema = buildAllOfSchema(selfsAllOf, required);

  const newRequired = required.filter(
    (r) =>
      !visitedRefProperties.includes(r) && !visitedSelfProperties.includes(r)
  );

  const newProps = Object.fromEntries(
    properties.filter(
      ([p]) =>
        !visitedRefProperties.includes(p) && !visitedSelfProperties.includes(p)
    )
  );

  return {
    ...sch,
    required: newRequired,
    properties: newProps,
    allOf: [...refsAllOfSchema, ...selfsAllOfSchema],
    additionalProperties: true,
  } as JSONSchemaType<AnyType>;
};
