import { ParseSource } from './parsers';
import { TypedAjvStorage } from './typed-ajv';
import { Meta, MetaVisitor, ParsedResult, TypedAjvStorageOption } from './types';
export interface ITypedAjvParserPlugin<TMeta extends Meta = Meta, TParsedResult extends ParsedResult = ParsedResult> extends ITypedAjvBasePlugin<TParsedResult> {
    parser: ParseSource<TMeta, TParsedResult>;
}
export interface ITypedAjvVisitorPlugin<TMeta extends Meta = Meta, TParsedResult extends ParsedResult = ParsedResult> extends ITypedAjvBasePlugin<TParsedResult> {
    visitor: MetaVisitor<TMeta, TParsedResult>;
    initParser(): TParsedResult;
}
export interface ITypedAjvBasePlugin<TParsedResult extends ParsedResult = ParsedResult> extends TypedAjvStorageOption<TParsedResult> {
    name: string;
}
declare type BuilderType = 'parser' | 'visitor';
export declare class TypedAjvBuilder<TMeta extends Meta = Meta, TParsedResult extends ParsedResult = ParsedResult, TBuilderType extends BuilderType = 'parser', THasPlugin extends boolean = false> {
    private mode;
    private lastPluginName;
    private parser;
    private options;
    private ajvFns;
    private initParser;
    private visitors;
    build(): TypedAjvStorage<TMeta, TParsedResult>;
    usePluginType<TPluginType extends BuilderType>(type: THasPlugin extends true ? never : TPluginType): TypedAjvBuilder<TMeta, TParsedResult, TPluginType>;
    usePlugin<CMeta extends TMeta = TMeta, CParsedResult extends TParsedResult = TParsedResult>(plugin: TBuilderType extends 'parser' ? ITypedAjvParserPlugin<CMeta, CParsedResult> : ITypedAjvVisitorPlugin<CMeta, CParsedResult>): TypedAjvBuilder<CMeta, CParsedResult, TBuilderType, true>;
    useOptions(options: TypedAjvStorageOption<TParsedResult>): this;
    private handleParserPlugin;
    private handleVisitorPlugin;
    private handleOptions;
}
export {};
