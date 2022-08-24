import { ITypedAjvParserPlugin, ITypedAjvVisitorPlugin } from '../../../common';
import { MetaWithValidateIf, ParsedValidateIfResult } from './types';
export declare const validateIfParserPlugin: ITypedAjvParserPlugin<MetaWithValidateIf, ParsedValidateIfResult>;
export declare const validateIfVisitorPlugin: ITypedAjvVisitorPlugin<MetaWithValidateIf, ParsedValidateIfResult>;
