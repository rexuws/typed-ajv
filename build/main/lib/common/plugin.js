"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedAjvBuilder = void 0;
const utils_1 = require("../utils");
const parsers_1 = require("./parsers");
const typed_ajv_1 = require("./typed-ajv");
class TypedAjvBuilder {
    constructor() {
        this.mode = 'parser';
        this.parser = parsers_1.commonParser;
        this.options = {};
        this.ajvFns = [];
        this.visitors = [
            parsers_1.Parser.parseConstraint,
            parsers_1.Parser.parseFormat,
            parsers_1.Parser.parseAllowNullable,
            parsers_1.Parser.parseTypeDefs,
        ];
    }
    build() {
        const ajv = this.ajvFns.length
            ? (0, utils_1.pipeline)((_, arg) => arg, ...this.ajvFns)
            : undefined;
        const parser = this.mode === 'parser'
            ? this.parser
            : parsers_1.Parser.combineParser(this.initParser, ...this.visitors);
        return new typed_ajv_1.TypedAjvStorage(parser, Object.assign(Object.assign({}, this.options), { ajv }));
    }
    usePlugin(plugin) {
        if ('parser' in plugin) {
            this.handleParserPlugin(plugin);
            return this;
        }
        this.handleVisitorPlugin(plugin);
        return this;
    }
    useOptions(options) {
        this.handleOptions(options);
        return this;
    }
    handleParserPlugin(plugin) {
        const { parser, name } = plugin, opts = __rest(plugin, ["parser", "name"]);
        if (this.mode === 'visitor') {
            throw new Error(`All plugins must be of the same type, the plugin '${this.lastPluginName}' is a visitor plugin`);
        }
        this.mode = 'parser';
        this.lastPluginName = name;
        this.parser = parser;
        this.handleOptions(opts);
    }
    handleVisitorPlugin(plugin) {
        const { initParser, visitor, name } = plugin, opts = __rest(plugin, ["initParser", "visitor", "name"]);
        if (this.lastPluginName && this.mode === 'parser') {
            throw new Error(`All plugins must be of the same type, the plugin '${this.lastPluginName}' is a parser plugin`);
        }
        this.visitors.push(visitor);
        this.initParser = initParser;
        this.lastPluginName = name;
        this.handleOptions(opts);
    }
    handleOptions(opts) {
        var _a, _b, _c, _d;
        const { ajv, constructJSONSchemaFns = [], constructJTDSchemaFns = [] } = opts, p = __rest(opts, ["ajv", "constructJSONSchemaFns", "constructJTDSchemaFns"]);
        this.options = Object.assign(Object.assign(Object.assign({}, this.options), p), { constructJSONSchemaFns: [
                ...((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.constructJSONSchemaFns) !== null && _b !== void 0 ? _b : []),
                ...constructJSONSchemaFns,
            ], constructJTDSchemaFns: [
                ...((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.constructJTDSchemaFns) !== null && _d !== void 0 ? _d : []),
                ...constructJTDSchemaFns,
            ] });
        if (ajv)
            this.ajvFns.push(ajv);
    }
}
exports.TypedAjvBuilder = TypedAjvBuilder;
