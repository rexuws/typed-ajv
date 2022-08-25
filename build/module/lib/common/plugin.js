import { pipeline } from '../utils';
import { commonParser, Parser } from './parsers';
import { TypedAjvStorage } from './typed-ajv';
export class TypedAjvBuilder {
    mode = 'parser';
    lastPluginName;
    parser = commonParser;
    options = {};
    ajvFns = [];
    initParser;
    visitors = [
        Parser.parseConstraint,
        Parser.parseFormat,
        Parser.parseAllowNullable,
        Parser.parseTypeDefs,
    ];
    build() {
        const ajv = this.ajvFns.length
            ? pipeline((_, arg) => arg, ...this.ajvFns)
            : undefined;
        const parser = this.mode === 'parser'
            ? this.parser
            : Parser.combineParser(this.initParser, ...this.visitors);
        return new TypedAjvStorage(parser, {
            ...this.options,
            ajv,
        });
    }
    usePluginType(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type) {
        return this;
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
        const { parser, name, ...opts } = plugin;
        if (this.mode === 'visitor') {
            throw new Error(`All plugins must be of the same type, the plugin '${this.lastPluginName}' is a visitor plugin`);
        }
        this.mode = 'parser';
        this.lastPluginName = name;
        this.parser = parser;
        this.handleOptions(opts);
    }
    handleVisitorPlugin(plugin) {
        const { initParser, visitor, name, ...opts } = plugin;
        if (this.lastPluginName && this.mode === 'parser') {
            throw new Error(`All plugins must be of the same type, the plugin '${this.lastPluginName}' is a parser plugin`);
        }
        this.visitors.push(visitor);
        this.initParser = initParser;
        this.lastPluginName = name;
        this.handleOptions(opts);
    }
    handleOptions(opts) {
        const { ajv, constructJSONSchemaFns = [], constructJTDSchemaFns = [], ...p } = opts;
        this.options = {
            ...this.options,
            ...p,
            constructJSONSchemaFns: [
                ...(this.options?.constructJSONSchemaFns ?? []),
                ...constructJSONSchemaFns,
            ],
            constructJTDSchemaFns: [
                ...(this.options?.constructJTDSchemaFns ?? []),
                ...constructJTDSchemaFns,
            ],
        };
        if (ajv)
            this.ajvFns.push(ajv);
    }
}
