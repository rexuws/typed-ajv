import { O } from 'ts-toolbelt';
import { SelfExtend } from '../utils';
import type { MergedMeta, Meta, MetaVisitor, ParsedResult, ParseMetaOptions } from './types';
export interface ParseSource<TMeta extends Meta, TParsedResult extends ParsedResult> {
    (props: [string, MergedMeta<TMeta>][], options?: ParseMetaOptions): TParsedResult;
}
export declare type ParseSourceParams<TMeta extends Meta, TParsedResult extends ParsedResult> = [
    init: () => TParsedResult,
    ...parsers: MetaVisitor<TMeta, TParsedResult>[]
];
export declare const commonParser: SelfExtend<ParseSource<Meta, ParsedResult>, ParseSourceParams<Meta, ParsedResult>>;
export declare const Parser: {
    combineParser: <TMeta extends Meta, TParsedResult extends ParsedResult>(init: () => TParsedResult, ...parsers: MetaVisitor<TMeta, TParsedResult>[]) => SelfExtend<ParseSource<TMeta, TParsedResult>, ParseSourceParams<TMeta, TParsedResult>>;
    commonParser: SelfExtend<ParseSource<Meta, ParsedResult>, ParseSourceParams<Meta, ParsedResult>>;
    parse: <TMeta_1 extends Meta, TParsedResult_1 extends ParsedResult>(source: O.Object, parseSource: ParseSource<TMeta_1, TParsedResult_1>, options?: ParseMetaOptions) => TParsedResult_1;
    parseConstraint: MetaVisitor<Meta, ParsedResult>;
    parseFormat: MetaVisitor<Meta, ParsedResult>;
    parseAllowNullable: MetaVisitor<Meta, ParsedResult>;
    parseTypeDefs: MetaVisitor<Meta, ParsedResult>;
};
