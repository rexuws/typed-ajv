import 'reflect-metadata';
import type { O } from 'ts-toolbelt';
import { ParseSource } from './parsers';
import type { CompiledResult, Meta, ParsedResult, TypedAjvStorageOption } from './types';
export declare class TypedAjvStorage<TMeta extends Meta = Meta, TParsedResult extends ParsedResult = ParsedResult> {
    #private;
    constructor(parseSource: ParseSource<TMeta, TParsedResult>, options?: TypedAjvStorageOption<TParsedResult>);
    private init;
    private initAjv;
    private initJtd;
    /**
     * "If the target is not already being compiled, add it to the queue and call the callback when it's
     * done."
     *
     * The first thing we do is get the id of the target. This is the unique identifier of the object. We
     * use this to store the callback in the `yieldCallbacks` object
     * @param target - The object to compile.
     * @param cb - The callback function that will be called when the compilation is done.
     */
    _compile(target: O.Object, cb: (error: Error, data: CompiledResult) => void): void;
    compile: (arg1: {
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
    }) => Promise<CompiledResult>;
    /**
     * It takes an object, parses it, and adds the result to the storage
     * @param target - The object to be parsed.
     */
    add(target: O.Object): void;
    get(target: O.Object): CompiledResult;
    /**
     * Adds a custom format to the AJV instance
     * @param {Format} format - Format
     * @returns A boolean value indicate if the format is successfully added
     */
    private addFormat;
    /**
     * It adds a JTD schema to the registry
     * @param {string} id - The id of the JTD file.
     * @param {ParsedResult} parsedResult - ParsedResult
     * @returns the value of the variable `this.#JTDSchemas.get(id)`
     */
    private addJTD;
    /**
     * It adds a JSON schema to the Ajv instance
     * @param {string} id - The id of the schema.
     * @param {ParsedResult} parsedResult - ParsedResult
     * @returns The return value is a function that takes a single argument, which is the object to be
     * validated.
     */
    private addJSONSchema;
    private registerUnresolvedDefinition;
    /**
     * It registers an event listener for a given definition id, and when the event is emitted, it calls
     * all the callbacks that were registered for that definition id
     * @param {string} defId - The definition ID of the schema that is being resolved.
     */
    private registerUnresolvedDefinitionEvent;
    /**
     * It returns true if any of the values in the definitions object are functions
     * @param {ParsedJTDSchema} schema - ParsedJTDSchema - The schema that was parsed from the JTD file.
     * @returns A boolean value.
     */
    private isUnresolvedJTDSchema;
    /**
     * Get all the definitions from the schema that are classes and return them as an array
     * @param {ParsedJTDSchema} schema - ParsedJTDSchema - The schema that was parsed from the JTD file.
     * @returns An array of classes that are not resolved.
     */
    private getUnresolvedDefinitions;
    /**
     * Add a definition to the set of unresolved definitions.
     * @param {string} def - string - the name of the definition
     */
    private addUnresolvedDef;
    /**
     * Attach callback to be executed after a reference schema is compiled
     *
     * The compiled reference schema is set to the target schema by `refId`
     *
     * If the target schema has no other unresolved references, its serializer function will be compiled
     */
    private registerResolvedReferenceCallback;
    /**
     * Compile schema to the serializer function
     *
     * Emit two events: the one whose key is schema id is used to trigger the callback of other schemas that has reference to this schema
     *
     * Another one is used to yield the serializer function to the caller
     */
    private compileSerializer;
    /**
     * It emits a yield event for the given schemaId with the payload of schemaId and error object
     * @param {string} schemaId - The id of the schema that will be yielded.
     * @param {unknown} err - The error that was thrown.
     */
    private emitError;
    /**
     * Signal that the schema is fully resolved
     * @param {string} schemaId - The id of the schema that will be yielded.
     */
    private emitResult;
    /**
     * Try to execute the callback, if it throws an error, emit it over `emitError`.
     * @param {string} schemaId - The id of the schema that is being validated.
     * @param cb - The callback function that will be called.
     */
    private wrapError;
    private compileFnSync;
    private cacheCompiledResult;
    /**
     * Push a callback to the map of callbacks by reference schemaId
     */
    private addResolvedReferenceCallback;
    /**
     * Push a callback to the map of asynchronous callbacks by reference schemaId
     */
    private addYieldCallback;
    /**
     * > This function registers an event listener for the `yield_` event
     * @param {string} schemaId - The schema id that is being registered.
     * @returns The return value is the result of the callback function.
     */
    private registerOnYield;
    /**
     * It takes a schemaId, a serializer, a validator, and an optional error, and then it calls the first
     * callback in the queue for that schemaId, passing it the error or the serializer and validator
     * @param {string} schemaId - The schema id.
     * @param {AnyValidateFunction} validator - AnyValidateFunction
     * @param {Error} [error] - The error that was thrown when the schema was being compiled.
     * @returns A function that takes a schemaId, serializer, validator, and error.
     */
    private execYieldCallback;
    /**
     * It removes the definition from the unresolved definitions map and the callbacks map
     * @param {string} defId - The definition ID of the definition that is being resolved.
     */
    private clear;
    /**
     * If there are no more unresolved definitions, remove all listeners from the event
     */
    private tryClearEvent;
    /**
     * Internally call `ajv.getSchema` to get the validator function.
     * This function is wrapped by a `wrapAjvValidator` to allow additional argument
     */
    private compileAjvValidator;
    /**
     * Wrap the ajv validator function into a new function that takes a second argument as the context object.
     */
    private wrapAjvValidator;
}
