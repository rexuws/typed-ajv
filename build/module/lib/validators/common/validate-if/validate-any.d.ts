import { FuncKeywordDefinition } from 'ajv';
export interface ValidateAny {
    <A, B, C>(data: A, parentData: B, rootData: C, thisCtx: false): boolean;
    <A, B, C, D>(data: A, parentData: B, rootData: C, thisCtx: D): boolean;
}
export declare const validateAnyKeyword: FuncKeywordDefinition;
