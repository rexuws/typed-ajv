import { C, O } from 'ts-toolbelt';

import { pipeline, SelfExtend } from '../utils';

import { MetaStorage } from './MetaStorage';
import { PROP } from './keys';
import type {
  AnyType,
  ClassType,
  MergedMeta,
  Meta,
  MetaVisitor,
  ParsedResult,
  ParsedTypeDefinition,
  ParseMetaOptions,
  PrimitiveType,
  TypeDef,
} from './types';

export interface ParseSource<
  TMeta extends Meta,
  TParsedResult extends ParsedResult
> {
  (
    props: [string, MergedMeta<TMeta>][],
    options?: ParseMetaOptions
  ): TParsedResult;
}

export type ParseSourceParams<
  TMeta extends Meta,
  TParsedResult extends ParsedResult
> = [
  init: () => TParsedResult,
  ...parsers: MetaVisitor<TMeta, TParsedResult>[]
];

/**
 * Combine multiple meta visitor functions into a single function
 */
const combineVisitors = <
  TMeta extends Meta,
  TParsedResult extends ParsedResult
>(
  ...args: ParseSourceParams<TMeta, TParsedResult>
): SelfExtend<
  ParseSource<TMeta, TParsedResult>,
  ParseSourceParams<TMeta, TParsedResult>
> => {
  const [init, ...parsers] = args;
  const pipelinedVisitors = pipeline((_, args) => args, ...parsers);

  const fn: SelfExtend<
    ParseSource<TMeta, TParsedResult>,
    ParseSourceParams<TMeta, TParsedResult>
  > = (props, options) => {
    const parsedResult = init();

    props.map(([key, meta]) =>
      pipelinedVisitors(key, meta, parsedResult, options)
    );

    return parsedResult;
  };

  fn.extends = (newInit: AnyType, ...visitors: AnyType[]) =>
    combineVisitors(newInit, ...parsers, ...visitors);

  return fn;
};

const parseConstraint: MetaVisitor<Meta, ParsedResult> = (
  key,
  meta,
  output
) => {
  if (!meta.constraint) return;

  output.constraints[key] = meta.constraint;
  return;
};

const parseFormat: MetaVisitor<Meta, ParsedResult> = (
  key,
  meta,
  output,
  options
) => {
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

    const registerCount = options.registeredFormats.filter((e) =>
      e.startsWith(f.name)
    ).length;

    const currentCount = output.formats.filter(
      ({ name }) => f.name === name
    ).length;

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

const parseAllowNullable: MetaVisitor<Meta, ParsedResult> = (
  key,
  meta,
  output
) => {
  if (meta.allowEmpty) {
    output.allowNullables[0].push(key);
    return;
  }
  output.allowNullables[1].push(key);
};

const parseTypeDefs: MetaVisitor<Meta, ParsedResult> = (
  key,
  meta,
  output,
  options
) => {
  if (!meta.typeDef) return;

  const [_type, classRefs] = _parseTypeDef(meta.typeDef);

  const { validateNested, ...type } = _type;

  if (meta.transform) {
    type.metadata = { transform: meta.transform };
  }

  output.types.properties[key] = type;

  if (Object.keys(classRefs).length) {
    Object.entries(classRefs).forEach(
      ([refId, cls]) => (output.types.definitions[refId] = cls)
    );

    if (
      typeof validateNested === 'boolean'
        ? validateNested
        : options?.validateNested
    ) {
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

export const commonParser = combineVisitors<Meta, ParsedResult>(
  () => ({
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
  }),
  parseConstraint,
  parseFormat,
  parseAllowNullable,
  parseTypeDefs
);

const _parseTypeDef = (
  typeDef: TypeDef
): [ParsedTypeDefinition, Record<string, C.Class>] => {
  const type: ParsedTypeDefinition = {};

  const classRefs: Record<string, C.Class> = {};

  if ((<ClassType>typeDef).class) {
    const { class: cls, validateNested } = <ClassType>typeDef;

    const ref = MetaStorage.getId(cls);

    classRefs[ref] = cls;

    type.validateNested = validateNested;

    if (typeDef.isArray) {
      type.elements = {
        ref: ref,
      };
      type.nullable = true;
    } else {
      type.ref = ref;
    }
  }

  if ((<PrimitiveType>typeDef).type) {
    const { type: _type } = <PrimitiveType>typeDef;

    if (typeDef.isArray) {
      type.elements = {
        type: _type,
      };
      type.nullable = true;
    } else {
      type.type = _type;
    }
  }

  if (typeDef.nullable) {
    type.nullable = true;
  }

  return [type, classRefs];
};

const parse = <TMeta extends Meta, TParsedResult extends ParsedResult>(
  source: O.Object,
  parseSource: ParseSource<TMeta, TParsedResult>,
  options?: ParseMetaOptions
): TParsedResult => {
  const props = MetaStorage.getAll<MergedMeta<TMeta>>(source, PROP);

  if (!props) throw new Error('No compile');

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
