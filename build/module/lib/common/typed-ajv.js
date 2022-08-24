import 'reflect-metadata';
import { EventEmitter } from 'stream';
import { promisify } from 'util';
import addFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';
import Ajv from 'ajv/dist/ajv';
import Jtd from 'ajv/dist/jtd';
import { errorMessage$, patchReportError } from '../patch/error-message';
import { pipeline } from '../utils';
import { MetaStorage } from './MetaStorage';
import { Parser } from './parsers';
import { _compileSerializer } from './serializer';
export class TypedAjvStorage {
    #compiled = new Map();
    #JTDSchemas = new Map();
    #JSONSchemas = new Map();
    #unresolvedDefinition = new Set();
    #event = new EventEmitter({
        captureRejections: true,
    });
    #callbacksMap = new Map();
    #yieldCallbacksMap = new Map();
    #jtd;
    #ajv;
    #async;
    #options;
    #customFormats = [];
    #parseSource;
    #constructJSONSchemaFn;
    #constructJTDSchemaFn;
    constructor(parseSource, options) {
        this.#parseSource = parseSource;
        this.#options = options || {};
        const [ajv, jtd] = this.init();
        this.#ajv = ajv;
        this.#jtd = jtd;
    }
    init() {
        const { compileAsync, constructJSONSchemaFns, constructJTDSchemaFns } = this.#options;
        this.#async = !!compileAsync;
        if (constructJSONSchemaFns?.length) {
            this.#constructJSONSchemaFn = pipeline((schema, args) => [schema, args[1], args[2]], ...constructJSONSchemaFns);
        }
        if (constructJTDSchemaFns?.length) {
            this.#constructJTDSchemaFn = pipeline((schema, args) => [schema, args[1], args[2]], ...constructJTDSchemaFns);
        }
        return [this.initAjv(), this.initJtd()];
    }
    initAjv() {
        const { allErrors, useCustomMessage, ajv: ajvFn } = this.#options;
        const ajv = new Ajv({
            allErrors: allErrors || !!useCustomMessage,
            passContext: true,
        });
        ajvKeywords(ajv);
        addFormats(ajv);
        patchReportError();
        ajv.addKeyword(errorMessage$());
        if (ajvFn)
            ajvFn(ajv);
        return ajv;
    }
    initJtd() {
        const jtd = new Jtd();
        jtd._compileSerializer = _compileSerializer.bind(jtd);
        return jtd;
    }
    /**
     * "If the target is not already being compiled, add it to the queue and call the callback when it's
     * done."
     *
     * The first thing we do is get the id of the target. This is the unique identifier of the object. We
     * use this to store the callback in the `yieldCallbacks` object
     * @param target - The object to compile.
     * @param cb - The callback function that will be called when the compilation is done.
     */
    _compile(target, cb) {
        const id = MetaStorage.getId(target);
        this.addYieldCallback(id, cb);
        this.add(target);
    }
    compile = promisify(this._compile);
    /**
     * It takes an object, parses it, and adds the result to the storage
     * @param target - The object to be parsed.
     */
    add(target) {
        const parsedResult = Parser.parse(target, this.#parseSource, {
            ...this.#options,
            registeredFormats: this.#customFormats,
        });
        const id = MetaStorage.getId(target);
        parsedResult.formats.forEach((format) => this.addFormat(format));
        this.addJSONSchema(id, parsedResult, target);
        this.addJTD(id, parsedResult, target);
    }
    get(target) {
        const compiled = this.#compiled.get(MetaStorage.getId(target));
        if (!compiled)
            throw new Error('The target is not compiled');
        return compiled;
    }
    /**
     * Adds a custom format to the AJV instance
     * @param {Format} format - Format
     * @returns A boolean value indicate if the format is successfully added
     */
    addFormat(format) {
        const { name, type, validate } = format;
        if (this.#customFormats.includes(name))
            return false;
        this.#customFormats.push(name);
        this.#ajv.addFormat(name, { type, validate, name });
        return true;
    }
    /**
     * It adds a JTD schema to the registry
     * @param {string} id - The id of the JTD file.
     * @param {ParsedResult} parsedResult - ParsedResult
     * @returns the value of the variable `this.#JTDSchemas.get(id)`
     */
    addJTD(id, parsedResult, source) {
        if (this.#JTDSchemas.has(id))
            return;
        const { types: jtdSchema } = parsedResult;
        this.#JTDSchemas.set(id, this.#constructJTDSchemaFn
            ? this.#constructJTDSchemaFn(jtdSchema, parsedResult, source)
            : jtdSchema);
        if (this.isUnresolvedJTDSchema(jtdSchema)) {
            const unresolved = this.getUnresolvedDefinitions(jtdSchema);
            unresolved.forEach((cls) => this.registerUnresolvedDefinition(id, cls));
        }
        else
            this.compileSerializer(id, jtdSchema);
    }
    /**
     * It adds a JSON schema to the Ajv instance
     * @param {string} id - The id of the schema.
     * @param {ParsedResult} parsedResult - ParsedResult
     * @returns The return value is a function that takes a single argument, which is the object to be
     * validated.
     */
    addJSONSchema(id, parsedResult, source) {
        if (this.#JSONSchemas.has(id))
            return;
        const { constraints, allowNullables } = parsedResult;
        const [, required] = allowNullables;
        const _schema = {
            $id: id,
            type: 'object',
            properties: constraints,
            additionalProperties: false,
            required: required,
        };
        const schema = this.#constructJSONSchemaFn
            ? this.#constructJSONSchemaFn(_schema, parsedResult, source)
            : _schema;
        this.#JSONSchemas.set(id, schema);
        this.#ajv.addSchema(schema);
    }
    registerUnresolvedDefinition(schemaId, cls) {
        const defId = MetaStorage.getId(cls);
        this.registerResolvedReferenceCallback(schemaId, defId);
        if (!this.#unresolvedDefinition.has(defId)) {
            this.addUnresolvedDef(defId);
            this.registerUnresolvedDefinitionEvent(defId);
        }
        this.add(cls);
    }
    /**
     * It registers an event listener for a given definition id, and when the event is emitted, it calls
     * all the callbacks that were registered for that definition id
     * @param {string} defId - The definition ID of the schema that is being resolved.
     */
    registerUnresolvedDefinitionEvent(defId) {
        this.#event.on(defId, (schema) => {
            const cbHandlers = this.#callbacksMap.get(defId);
            if (!cbHandlers)
                return;
            cbHandlers.forEach((cb) => cb(schema));
            setImmediate(() => {
                this.clear(defId);
                this.tryClearEvent();
            });
        });
    }
    /**
     * It returns true if any of the values in the definitions object are functions
     * @param {ParsedJTDSchema} schema - ParsedJTDSchema - The schema that was parsed from the JTD file.
     * @returns A boolean value.
     */
    isUnresolvedJTDSchema(schema) {
        return Object.values(schema.definitions).some((e) => typeof e === 'function');
    }
    /**
     * Get all the definitions from the schema that are classes and return them as an array
     * @param {ParsedJTDSchema} schema - ParsedJTDSchema - The schema that was parsed from the JTD file.
     * @returns An array of classes that are not resolved.
     */
    getUnresolvedDefinitions(schema) {
        return Object.entries(schema.definitions)
            .filter((e) => typeof e[1] === 'function')
            .map(([, val]) => val);
    }
    /**
     * Add a definition to the set of unresolved definitions.
     * @param {string} def - string - the name of the definition
     */
    addUnresolvedDef(def) {
        this.#unresolvedDefinition.add(def);
    }
    /**
     * Attach callback to be executed after a reference schema is compiled
     *
     * The compiled reference schema is set to the target schema by `refId`
     *
     * If the target schema has no other unresolved references, its serializer function will be compiled
     */
    registerResolvedReferenceCallback(schemaId, refId) {
        const callback = (o) => {
            const schema = this.#JTDSchemas.get(schemaId);
            if (!schema)
                throw new Error("Can't find schema");
            if (o.definitions) {
                Object.entries(o.definitions).forEach(([key, value]) => (schema.definitions[key] = value));
            }
            schema.definitions[refId] = {
                properties: o.properties,
            };
            if (!this.isUnresolvedJTDSchema(schema)) {
                this.compileSerializer(schemaId, schema);
            }
        };
        this.addResolvedReferenceCallback(refId, callback);
    }
    /**
     * Compile schema to the serializer function
     *
     * Emit two events: the one whose key is schema id is used to trigger the callback of other schemas that has reference to this schema
     *
     * Another one is used to yield the serializer function to the caller
     */
    compileSerializer(schemaId, schema) {
        const { definitions, properties } = schema;
        const sch = Object.keys(definitions).length ? schema : { properties };
        if (this.#async) {
            setImmediate(() => {
                this.wrapError(schemaId, () => this.cacheCompiledResult(schemaId, this.compileFnSync(schemaId, sch)));
                this.#event.emit(schemaId, sch);
            });
        }
        this.wrapError(schemaId, () => this.cacheCompiledResult(schemaId, this.compileFnSync(schemaId, sch)));
        this.#event.emit(schemaId, sch);
    }
    /**
     * It emits a yield event for the given schemaId with the payload of schemaId and error object
     * @param {string} schemaId - The id of the schema that will be yielded.
     * @param {unknown} err - The error that was thrown.
     */
    emitError(schemaId, err) {
        this.#event.emit(`yield_${schemaId}`, schemaId, err);
    }
    /**
     * Signal that the schema is fully resolved
     * @param {string} schemaId - The id of the schema that will be yielded.
     */
    emitResult(schemaId) {
        this.#event.emit(`yield_${schemaId}`, schemaId);
    }
    /**
     * Try to execute the callback, if it throws an error, emit it over `emitError`.
     * @param {string} schemaId - The id of the schema that is being validated.
     * @param cb - The callback function that will be called.
     */
    wrapError(schemaId, cb) {
        try {
            cb();
        }
        catch (err) {
            this.emitError(schemaId, err);
        }
    }
    compileFnSync(schemaId, schema) {
        const serialize = this.#jtd.compileSerializer(schema);
        const validate = this.compileAjvValidator(schemaId);
        const parse = () => null;
        const result = {
            parse,
            serialize,
            validate,
        };
        return result;
    }
    cacheCompiledResult(schemaId, result) {
        this.#compiled.set(schemaId, result);
        this.emitResult(schemaId);
    }
    /**
     * Push a callback to the map of callbacks by reference schemaId
     */
    addResolvedReferenceCallback(eventId, cb) {
        const callbacks = this.#callbacksMap.get(eventId);
        if (!callbacks) {
            this.#callbacksMap.set(eventId, [cb]);
        }
        else {
            callbacks.push(cb);
        }
    }
    /**
     * Push a callback to the map of asynchronous callbacks by reference schemaId
     */
    addYieldCallback(eventId, cb) {
        const callbacks = this.#yieldCallbacksMap.get(eventId);
        if (!callbacks) {
            this.#yieldCallbacksMap.set(eventId, [cb]);
            this.registerOnYield(eventId);
        }
        else {
            callbacks.push(cb);
        }
    }
    /**
     * > This function registers an event listener for the `yield_` event
     * @param {string} schemaId - The schema id that is being registered.
     * @returns The return value is the result of the callback function.
     */
    registerOnYield(schemaId) {
        const eventName = 'yield_' + schemaId;
        if (this.#event.eventNames().includes(eventName))
            return;
        this.#event.on(eventName, (schemaId, error) => {
            const compiled = this.#compiled.get(schemaId);
            this.execYieldCallback(schemaId, compiled, error);
        });
    }
    /**
     * It takes a schemaId, a serializer, a validator, and an optional error, and then it calls the first
     * callback in the queue for that schemaId, passing it the error or the serializer and validator
     * @param {string} schemaId - The schema id.
     * @param {AnyValidateFunction} validator - AnyValidateFunction
     * @param {Error} [error] - The error that was thrown when the schema was being compiled.
     * @returns A function that takes a schemaId, serializer, validator, and error.
     */
    execYieldCallback(schemaId, compiledResult, error) {
        const callbacks = this.#yieldCallbacksMap.get(schemaId);
        if (!callbacks)
            return;
        const cb = callbacks.shift();
        if (!cb)
            return;
        if (error) {
            cb(error);
            return;
        }
        if (!compiledResult) {
            cb(new Error(`No compiled result for ${schemaId}`));
            return;
        }
        cb(undefined, compiledResult);
        this.execYieldCallback(schemaId, compiledResult, error);
    }
    /**
     * It removes the definition from the unresolved definitions map and the callbacks map
     * @param {string} defId - The definition ID of the definition that is being resolved.
     */
    clear(defId) {
        this.#unresolvedDefinition.delete(defId);
        this.#callbacksMap.delete(defId);
    }
    /**
     * If there are no more unresolved definitions, remove all listeners from the event
     */
    tryClearEvent() {
        if (this.#unresolvedDefinition.size === 0) {
            this.#event.removeAllListeners();
        }
    }
    /**
     * Internally call `ajv.getSchema` to get the validator function.
     * This function is wrapped by a `wrapAjvValidator` to allow additional argument
     */
    compileAjvValidator(schemaId) {
        const fn = this.#ajv.getSchema(schemaId);
        if (!fn) {
            throw new Error(`No validator for ${schemaId}`);
        }
        return fn;
        // return this.wrapAjvValidator(fn);
    }
    /**
     * Wrap the ajv validator function into a new function that takes a second argument as the context object.
     */
    wrapAjvValidator(validate) {
        const fn = new Proxy(validate, {
            apply(target, _, args) {
                const [data, ctx = false] = args;
                return target.call(ctx, data);
            },
        });
        return fn;
    }
}
