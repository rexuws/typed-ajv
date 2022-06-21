"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _TypedAjvStorage_compiled, _TypedAjvStorage_JTDSchemas, _TypedAjvStorage_JSONSchemas, _TypedAjvStorage_unresolvedDefinition, _TypedAjvStorage_event, _TypedAjvStorage_callbacksMap, _TypedAjvStorage_yieldCallbacksMap, _TypedAjvStorage_jtd, _TypedAjvStorage_ajv, _TypedAjvStorage_async, _TypedAjvStorage_options, _TypedAjvStorage_customFormats, _TypedAjvStorage_parseSource, _TypedAjvStorage_constructJSONSchemaFn, _TypedAjvStorage_constructJTDSchemaFn;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedAjvStorage = void 0;
require("reflect-metadata");
const stream_1 = require("stream");
const util_1 = require("util");
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_keywords_1 = __importDefault(require("ajv-keywords"));
const ajv_1 = __importDefault(require("ajv/dist/ajv"));
const jtd_1 = __importDefault(require("ajv/dist/jtd"));
const error_message_1 = require("../patch/error-message");
const utils_1 = require("../utils");
const MetaStorage_1 = require("./MetaStorage");
const parsers_1 = require("./parsers");
const serializer_1 = require("./serializer");
class TypedAjvStorage {
    constructor(parseSource, options) {
        _TypedAjvStorage_compiled.set(this, new Map());
        _TypedAjvStorage_JTDSchemas.set(this, new Map());
        _TypedAjvStorage_JSONSchemas.set(this, new Map());
        _TypedAjvStorage_unresolvedDefinition.set(this, new Set());
        _TypedAjvStorage_event.set(this, new stream_1.EventEmitter({
            captureRejections: true,
        }));
        _TypedAjvStorage_callbacksMap.set(this, new Map());
        _TypedAjvStorage_yieldCallbacksMap.set(this, new Map());
        _TypedAjvStorage_jtd.set(this, void 0);
        _TypedAjvStorage_ajv.set(this, void 0);
        _TypedAjvStorage_async.set(this, void 0);
        _TypedAjvStorage_options.set(this, void 0);
        _TypedAjvStorage_customFormats.set(this, []);
        _TypedAjvStorage_parseSource.set(this, void 0);
        _TypedAjvStorage_constructJSONSchemaFn.set(this, void 0);
        _TypedAjvStorage_constructJTDSchemaFn.set(this, void 0);
        this.compile = (0, util_1.promisify)(this._compile);
        __classPrivateFieldSet(this, _TypedAjvStorage_parseSource, parseSource, "f");
        __classPrivateFieldSet(this, _TypedAjvStorage_options, options || {}, "f");
        const [ajv, jtd] = this.init();
        __classPrivateFieldSet(this, _TypedAjvStorage_ajv, ajv, "f");
        __classPrivateFieldSet(this, _TypedAjvStorage_jtd, jtd, "f");
    }
    init() {
        const { compileAsync, constructJSONSchemaFns, constructJTDSchemaFns } = __classPrivateFieldGet(this, _TypedAjvStorage_options, "f");
        __classPrivateFieldSet(this, _TypedAjvStorage_async, !!compileAsync, "f");
        if (constructJSONSchemaFns) {
            __classPrivateFieldSet(this, _TypedAjvStorage_constructJSONSchemaFn, (0, utils_1.pipeline)((schema, args) => [schema, args[1], args[2]], ...constructJSONSchemaFns), "f");
        }
        if (constructJTDSchemaFns) {
            __classPrivateFieldSet(this, _TypedAjvStorage_constructJTDSchemaFn, (0, utils_1.pipeline)((schema, args) => [schema, args[1], args[2]], ...constructJTDSchemaFns), "f");
        }
        return [this.initAjv(), this.initJtd()];
    }
    initAjv() {
        const { allErrors, useCustomMessage, ajv: ajvFn } = __classPrivateFieldGet(this, _TypedAjvStorage_options, "f");
        const ajv = new ajv_1.default({
            allErrors: allErrors || !!useCustomMessage,
            passContext: true,
        });
        (0, ajv_keywords_1.default)(ajv);
        (0, ajv_formats_1.default)(ajv);
        (0, error_message_1.patchReportError)();
        ajv.addKeyword((0, error_message_1.errorMessage$)());
        if (ajvFn)
            ajvFn(ajv);
        return ajv;
    }
    initJtd() {
        const jtd = new jtd_1.default();
        jtd._compileSerializer = serializer_1._compileSerializer.bind(jtd);
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
        const id = MetaStorage_1.MetaStorage.getId(target);
        this.addYieldCallback(id, cb);
        this.add(target);
    }
    /**
     * It takes an object, parses it, and adds the result to the storage
     * @param target - The object to be parsed.
     */
    add(target) {
        const parsedResult = parsers_1.Parser.parse(target, __classPrivateFieldGet(this, _TypedAjvStorage_parseSource, "f"), Object.assign(Object.assign({}, __classPrivateFieldGet(this, _TypedAjvStorage_options, "f")), { registeredFormats: __classPrivateFieldGet(this, _TypedAjvStorage_customFormats, "f") }));
        const id = MetaStorage_1.MetaStorage.getId(target);
        parsedResult.formats.forEach((format) => this.addFormat(format));
        this.addJSONSchema(id, parsedResult, target);
        this.addJTD(id, parsedResult, target);
    }
    get(target) {
        const compiled = __classPrivateFieldGet(this, _TypedAjvStorage_compiled, "f").get(MetaStorage_1.MetaStorage.getId(target));
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
        if (__classPrivateFieldGet(this, _TypedAjvStorage_customFormats, "f").includes(name))
            return false;
        __classPrivateFieldGet(this, _TypedAjvStorage_customFormats, "f").push(name);
        __classPrivateFieldGet(this, _TypedAjvStorage_ajv, "f").addFormat(name, { type, validate, name });
        return true;
    }
    /**
     * It adds a JTD schema to the registry
     * @param {string} id - The id of the JTD file.
     * @param {ParsedResult} parsedResult - ParsedResult
     * @returns the value of the variable `this.#JTDSchemas.get(id)`
     */
    addJTD(id, parsedResult, source) {
        if (__classPrivateFieldGet(this, _TypedAjvStorage_JTDSchemas, "f").has(id))
            return;
        const { types: jtdSchema } = parsedResult;
        __classPrivateFieldGet(this, _TypedAjvStorage_JTDSchemas, "f").set(id, __classPrivateFieldGet(this, _TypedAjvStorage_constructJTDSchemaFn, "f")
            ? __classPrivateFieldGet(this, _TypedAjvStorage_constructJTDSchemaFn, "f").call(this, jtdSchema, parsedResult, source)
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
        if (__classPrivateFieldGet(this, _TypedAjvStorage_JSONSchemas, "f").has(id))
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
        const schema = __classPrivateFieldGet(this, _TypedAjvStorage_constructJSONSchemaFn, "f")
            ? __classPrivateFieldGet(this, _TypedAjvStorage_constructJSONSchemaFn, "f").call(this, _schema, parsedResult, source)
            : _schema;
        __classPrivateFieldGet(this, _TypedAjvStorage_JSONSchemas, "f").set(id, schema);
        __classPrivateFieldGet(this, _TypedAjvStorage_ajv, "f").addSchema(schema);
    }
    registerUnresolvedDefinition(schemaId, cls) {
        const defId = MetaStorage_1.MetaStorage.getId(cls);
        this.registerResolvedReferenceCallback(schemaId, defId);
        if (!__classPrivateFieldGet(this, _TypedAjvStorage_unresolvedDefinition, "f").has(defId)) {
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
        __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").on(defId, (schema) => {
            const cbHandlers = __classPrivateFieldGet(this, _TypedAjvStorage_callbacksMap, "f").get(defId);
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
        __classPrivateFieldGet(this, _TypedAjvStorage_unresolvedDefinition, "f").add(def);
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
            const schema = __classPrivateFieldGet(this, _TypedAjvStorage_JTDSchemas, "f").get(schemaId);
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
        if (__classPrivateFieldGet(this, _TypedAjvStorage_async, "f")) {
            setImmediate(() => {
                this.wrapError(schemaId, () => this.cacheCompiledResult(schemaId, this.compileFnSync(schemaId, sch)));
                __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").emit(schemaId, sch);
            });
        }
        this.wrapError(schemaId, () => this.cacheCompiledResult(schemaId, this.compileFnSync(schemaId, sch)));
        __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").emit(schemaId, sch);
    }
    /**
     * It emits a yield event for the given schemaId with the payload of schemaId and error object
     * @param {string} schemaId - The id of the schema that will be yielded.
     * @param {unknown} err - The error that was thrown.
     */
    emitError(schemaId, err) {
        __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").emit(`yield_${schemaId}`, schemaId, err);
    }
    /**
     * Signal that the schema is fully resolved
     * @param {string} schemaId - The id of the schema that will be yielded.
     */
    emitResult(schemaId) {
        __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").emit(`yield_${schemaId}`, schemaId);
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
        const serialize = __classPrivateFieldGet(this, _TypedAjvStorage_jtd, "f").compileSerializer(schema);
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
        __classPrivateFieldGet(this, _TypedAjvStorage_compiled, "f").set(schemaId, result);
        this.emitResult(schemaId);
    }
    /**
     * Push a callback to the map of callbacks by reference schemaId
     */
    addResolvedReferenceCallback(eventId, cb) {
        const callbacks = __classPrivateFieldGet(this, _TypedAjvStorage_callbacksMap, "f").get(eventId);
        if (!callbacks) {
            __classPrivateFieldGet(this, _TypedAjvStorage_callbacksMap, "f").set(eventId, [cb]);
        }
        else {
            callbacks.push(cb);
        }
    }
    /**
     * Push a callback to the map of asynchronous callbacks by reference schemaId
     */
    addYieldCallback(eventId, cb) {
        const callbacks = __classPrivateFieldGet(this, _TypedAjvStorage_yieldCallbacksMap, "f").get(eventId);
        if (!callbacks) {
            __classPrivateFieldGet(this, _TypedAjvStorage_yieldCallbacksMap, "f").set(eventId, [cb]);
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
        if (__classPrivateFieldGet(this, _TypedAjvStorage_event, "f").eventNames().includes(eventName))
            return;
        __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").on(eventName, (schemaId, error) => {
            const compiled = __classPrivateFieldGet(this, _TypedAjvStorage_compiled, "f").get(schemaId);
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
        const callbacks = __classPrivateFieldGet(this, _TypedAjvStorage_yieldCallbacksMap, "f").get(schemaId);
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
        __classPrivateFieldGet(this, _TypedAjvStorage_unresolvedDefinition, "f").delete(defId);
        __classPrivateFieldGet(this, _TypedAjvStorage_callbacksMap, "f").delete(defId);
    }
    /**
     * If there are no more unresolved definitions, remove all listeners from the event
     */
    tryClearEvent() {
        if (__classPrivateFieldGet(this, _TypedAjvStorage_unresolvedDefinition, "f").size === 0) {
            __classPrivateFieldGet(this, _TypedAjvStorage_event, "f").removeAllListeners();
        }
    }
    /**
     * Internally call `ajv.getSchema` to get the validator function.
     * This function is wrapped by a `wrapAjvValidator` to allow additional argument
     */
    compileAjvValidator(schemaId) {
        const fn = __classPrivateFieldGet(this, _TypedAjvStorage_ajv, "f").getSchema(schemaId);
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
exports.TypedAjvStorage = TypedAjvStorage;
_TypedAjvStorage_compiled = new WeakMap(), _TypedAjvStorage_JTDSchemas = new WeakMap(), _TypedAjvStorage_JSONSchemas = new WeakMap(), _TypedAjvStorage_unresolvedDefinition = new WeakMap(), _TypedAjvStorage_event = new WeakMap(), _TypedAjvStorage_callbacksMap = new WeakMap(), _TypedAjvStorage_yieldCallbacksMap = new WeakMap(), _TypedAjvStorage_jtd = new WeakMap(), _TypedAjvStorage_ajv = new WeakMap(), _TypedAjvStorage_async = new WeakMap(), _TypedAjvStorage_options = new WeakMap(), _TypedAjvStorage_customFormats = new WeakMap(), _TypedAjvStorage_parseSource = new WeakMap(), _TypedAjvStorage_constructJSONSchemaFn = new WeakMap(), _TypedAjvStorage_constructJTDSchemaFn = new WeakMap();
