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
export declare class TypedAjvBuilder<TMeta extends Meta = Meta, TParsedResult extends ParsedResult = ParsedResult> {
    private mode;
    private lastPluginName;
    private parser;
    private options;
    private ajvFns;
    private initParser;
    private visitors;
    build(): TypedAjvStorage<TMeta, TParsedResult>;
    usePlugin<CMeta extends TMeta = TMeta, CParsedResult extends TParsedResult = TParsedResult>(plugin: ITypedAjvParserPlugin<CMeta, CParsedResult> | ITypedAjvVisitorPlugin<CMeta, CParsedResult>): TypedAjvBuilder<CMeta, CParsedResult>;
    useOptions(options: TypedAjvStorageOption<TParsedResult>): this;
    private handleParserPlugin;
    private handleVisitorPlugin;
    private handleOptions;
}
