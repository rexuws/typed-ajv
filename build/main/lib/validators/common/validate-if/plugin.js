"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIfVisitorPlugin = exports.validateIfParserPlugin = void 0;
const common_1 = require("../../../common");
const parser_1 = require("./parser");
const validate_any_1 = require("./validate-any");
const initParser = () => ({
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
    validateIf: [],
});
const pluginName = 'parseValidateIf';
exports.validateIfParserPlugin = {
    name: pluginName,
    parser: common_1.commonParser.extends(initParser, parser_1.parseValidateIf),
    ajv: (ajv) => ajv.addKeyword(validate_any_1.validateAnyKeyword),
    constructJSONSchemaFns: [parser_1.constructJSONSchemaWithValidateIf],
};
exports.validateIfVisitorPlugin = {
    name: pluginName,
    initParser,
    visitor: parser_1.parseValidateIf,
    ajv: (ajv) => ajv.addKeyword(validate_any_1.validateAnyKeyword),
    constructJSONSchemaFns: [parser_1.constructJSONSchemaWithValidateIf],
};
