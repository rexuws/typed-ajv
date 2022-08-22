import { JSONSchemaType } from 'ajv';
import Ajv, { ValidateFunction } from 'ajv/dist/ajv';
import { JTDParser } from 'ajv/dist/types';
import { C, O } from 'ts-toolbelt';
export declare type AnyType = any;
/**
 * Allowed data type for JTDSchema
 */
export declare type AllowedType = 'string' | 'boolean' | 'timestamp' | 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'float32' | 'float64';
export declare type ParsedMeta<T> = O.Record<string, T>;
/**
 * Type representation for unfinished JTD Schema built from decorators
 *
 * When `definitions` contains no more class, a schema will be treated as a normal JTDSchema and will be used to generate a `serializer` / `parser`
 */
export declare type ParsedJTDSchema = {
    properties: Record<string, ParsedTypeDefinition>;
    definitions: Record<string, C.Class | O.Object>;
};
export declare type ParsedTypeDefinition = {
    ref?: string;
    type?: string;
    metadata?: {
        transform?: Transform;
    };
    elements?: {
        type?: string;
        ref?: string;
    };
    nullable?: boolean;
    validateNested?: boolean;
};
export declare type CompiledTransform = (o: O.Object) => string;
export declare type CompileOption = {
    strict?: boolean;
};
export declare type ErrorMessageTemplate = {
    toString(property: string, value: unknown): string;
};
export declare type Constraint = {
    errorMessage?: O.Record<string, string | ErrorMessageTemplate['toString']>;
} & O.Object;
export declare type BaseTypeDef = {
    nullable?: boolean;
    isArray?: boolean;
};
export declare type PrimitiveType = {
    type: AllowedType;
} & BaseTypeDef;
export declare type ClassType = {
    class: C.Class;
    validateNested?: boolean;
} & BaseTypeDef;
export declare type TypeDef = PrimitiveType | ClassType;
declare type Transform = <V, O, C>(value: unknown, object: O, context?: C) => V;
export declare type Format = {
    name: string;
    type: string | number;
    validate(value: unknown): boolean;
    /**
     * Automatically rename if the given format name is already used
     * @default false
     */
    autoRename?: boolean;
    readonly newName?: string;
};
export declare type Meta = {
    constraint?: Constraint;
    typeDef?: TypeDef;
    transform?: Transform;
    allowEmpty?: boolean;
    format?: Format;
};
export declare type InsertMeta<TMeta extends Meta> = O.AtLeast<O.Required<TMeta>>;
export declare type MergedMeta<TMeta extends Meta> = Omit<TMeta, 'format'> & {
    formats: Format[];
};
export declare type ParsedResult = {
    constraints: ParsedMeta<Constraint>;
    types: ParsedJTDSchema;
    allowNullables: [string[], string[]];
    formats: Format[];
};
export declare type CompiledResult = {
    serialize: (o: O.Object) => string;
    parse: JTDParser;
    validate: CtxValidatorFunction;
};
export interface IYieldResultCallback {
    (error: Error): void;
    (error: undefined, data: CompiledResult): void;
}
export declare type ParseMetaOptions = {
    /**
     * Allow overriding message for a single validation or a group of validations on the property
     *
     * If `true`, register `ajv-error` package to the ajv instance
     *
     * @see https://github.com/ajv-validator/ajv-errors
     *
     * @default false
     */
    useCustomMessage?: boolean;
    /**
     * Validate nested object or an array of objects
     *
     * @default false
     */
    validateNested?: boolean;
    registeredFormats?: string[];
};
export declare type TypedAjvStorageOption<TParsedResult extends ParsedResult> = ParseMetaOptions & {
    /**
     * Compile each schema in a single tick by `setImmediate` api
     *
     * @default false
     */
    compileAsync?: boolean;
    allErrors?: boolean;
    constructJSONSchemaFns?: ConstructJSONSchema<TParsedResult>[];
    constructJTDSchemaFns?: ConstructJTDSchema<TParsedResult>[];
    /**
     * Extends Ajv instance
     */
    ajv?: (ajv: Ajv) => void;
};
/**
 * Common type to parse a single meta registered by decorator
 *
 * @param key name
 * @param meta merged meta value of all decorators applied on target property
 * @param output output of parsed result
 */
export declare type MetaVisitor<TMeta extends Meta, TParsedResult extends ParsedResult> = (key: string, meta: MergedMeta<TMeta>, output: TParsedResult, options?: ParseMetaOptions) => void;
export declare type TypedClassDecorator<R extends O.Object> = (target: C.Class<readonly AnyType[], R>) => void;
export declare type TypedPropertyDecorator<R> = <K extends string, C extends {
    [k in K]?: R;
}>(target: C, prop: K) => void;
export declare type ConstructJSONSchema<TParsedResult extends ParsedResult> = (schema: JSONSchemaType<AnyType>, parsedMeta: TParsedResult, source: O.Object) => JSONSchemaType<AnyType>;
export declare type ConstructJTDSchema<TParsedResult extends ParsedResult> = (schema: ParsedJTDSchema, parsedMeta: TParsedResult, source: O.Object) => ParsedJTDSchema;
export interface CtxValidatorFunction<T = unknown> extends Pick<ValidateFunction, 'errors' | 'evaluated' | 'schema' | 'schemaEnv' | 'source'> {
    (data: unknown, context?: unknown): data is T;
}
export {};
