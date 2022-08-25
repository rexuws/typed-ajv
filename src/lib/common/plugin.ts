import { pipeline } from '../utils';

import { commonParser, Parser, ParseSource } from './parsers';
import { TypedAjvStorage } from './typed-ajv';
import {
  AnyType,
  Meta,
  MetaVisitor,
  ParsedResult,
  TypedAjvStorageOption,
} from './types';

export interface ITypedAjvParserPlugin<
  TMeta extends Meta = Meta,
  TParsedResult extends ParsedResult = ParsedResult
> extends ITypedAjvBasePlugin<TParsedResult> {
  parser: ParseSource<TMeta, TParsedResult>;
}

export interface ITypedAjvVisitorPlugin<
  TMeta extends Meta = Meta,
  TParsedResult extends ParsedResult = ParsedResult
> extends ITypedAjvBasePlugin<TParsedResult> {
  visitor: MetaVisitor<TMeta, TParsedResult>;
  initParser(): TParsedResult;
}

export interface ITypedAjvBasePlugin<
  TParsedResult extends ParsedResult = ParsedResult
> extends TypedAjvStorageOption<TParsedResult> {
  name: string;
}

type BuilderType = 'parser' | 'visitor';

export class TypedAjvBuilder<
  TMeta extends Meta = Meta,
  TParsedResult extends ParsedResult = ParsedResult,
  TBuilderType extends BuilderType = 'parser',
  THasPlugin extends boolean = false
> {
  private mode: 'parser' | 'visitor' = 'parser';

  private lastPluginName: string;

  private parser: ParseSource<TMeta, TParsedResult> = commonParser as AnyType;

  private options: TypedAjvStorageOption<TParsedResult> = {};

  private ajvFns: NonNullable<TypedAjvStorageOption<TParsedResult>['ajv']>[] =
    [];

  private initParser: () => TParsedResult;

  private visitors: MetaVisitor<TMeta, TParsedResult>[] = [
    Parser.parseConstraint,
    Parser.parseFormat,
    Parser.parseAllowNullable,
    Parser.parseTypeDefs,
  ];

  build(): TypedAjvStorage<TMeta, TParsedResult> {
    const ajv = this.ajvFns.length
      ? pipeline((_, arg) => arg, ...this.ajvFns)
      : undefined;

    const parser =
      this.mode === 'parser'
        ? this.parser
        : Parser.combineParser(this.initParser, ...this.visitors);

    return new TypedAjvStorage<TMeta, TParsedResult>(parser, {
      ...this.options,
      ajv,
    });
  }

  usePluginType<TPluginType extends BuilderType>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: THasPlugin extends true ? never : TPluginType
  ): TypedAjvBuilder<TMeta, TParsedResult, TPluginType> {
    return this as AnyType;
  }

  usePlugin<
    CMeta extends TMeta = TMeta,
    CParsedResult extends TParsedResult = TParsedResult
  >(
    plugin: TBuilderType extends 'parser'
      ? ITypedAjvParserPlugin<CMeta, CParsedResult>
      : ITypedAjvVisitorPlugin<CMeta, CParsedResult>
  ): TypedAjvBuilder<CMeta, CParsedResult, TBuilderType, true> {
    if ('parser' in plugin) {
      this.handleParserPlugin(plugin);

      return this as AnyType;
    }

    this.handleVisitorPlugin(plugin);

    return this as AnyType;
  }

  useOptions(options: TypedAjvStorageOption<TParsedResult>): this {
    this.handleOptions(options);
    return this;
  }

  private handleParserPlugin<
    CMeta extends TMeta = TMeta,
    CParsedResult extends TParsedResult = TParsedResult
  >(plugin: ITypedAjvParserPlugin<CMeta, CParsedResult>) {
    const { parser, name, ...opts } = plugin;

    if (this.mode === 'visitor') {
      throw new Error(
        `All plugins must be of the same type, the plugin '${this.lastPluginName}' is a visitor plugin`
      );
    }

    this.mode = 'parser';

    this.lastPluginName = name;

    this.parser = <AnyType>parser;

    this.handleOptions(opts);
  }

  private handleVisitorPlugin<
    CMeta extends TMeta = TMeta,
    CParsedResult extends TParsedResult = TParsedResult
  >(plugin: ITypedAjvVisitorPlugin<CMeta, CParsedResult>) {
    const { initParser, visitor, name, ...opts } = plugin;

    if (this.lastPluginName && this.mode === 'parser') {
      throw new Error(
        `All plugins must be of the same type, the plugin '${this.lastPluginName}' is a parser plugin`
      );
    }

    this.visitors.push(<AnyType>visitor);

    this.initParser = <AnyType>initParser;

    this.lastPluginName = name;

    this.handleOptions(opts);
  }

  private handleOptions(opts: TypedAjvStorageOption<AnyType>) {
    const {
      ajv,
      constructJSONSchemaFns = [],
      constructJTDSchemaFns = [],
      ...p
    } = opts;

    this.options = {
      ...this.options,
      ...p,
      constructJSONSchemaFns: [
        ...(this.options?.constructJSONSchemaFns ?? []),
        ...constructJSONSchemaFns,
      ],
      constructJTDSchemaFns: [
        ...(this.options?.constructJTDSchemaFns ?? []),
        ...constructJTDSchemaFns,
      ],
    };

    if (ajv) this.ajvFns.push(ajv);
  }
}
