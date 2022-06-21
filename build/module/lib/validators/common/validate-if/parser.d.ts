import { ConstructJSONSchema, MetaVisitor } from '../../../common/types';
import { MetaWithValidateIf, ParsedValidateIfResult } from './types';
export declare const parseValidateIf: MetaVisitor<MetaWithValidateIf, ParsedValidateIfResult>;
export declare const constructJSONSchemaWithValidateIf: ConstructJSONSchema<ParsedValidateIfResult>;
