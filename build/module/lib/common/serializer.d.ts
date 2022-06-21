import { SchemaEnv } from 'ajv/dist/compile';
import type Ajv from 'ajv/dist/core';
export declare function _compileSerializer<T>(this: Ajv, sch: SchemaEnv): (data: T) => string;
