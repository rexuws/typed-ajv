import { commonParser, } from '../../../common';
import { constructJSONSchemaWithValidateIf, parseValidateIf } from './parser';
import { validateAnyKeyword } from './validate-any';
const initParser = () => ({
    allowNullables: [[], []],
    constraints: {},
    formats: [],
    types: { definitions: {}, properties: {} },
    validateIf: [],
});
const pluginName = 'parseValidateIf';
export const validateIfParserPlugin = {
    name: pluginName,
    parser: commonParser.extends(initParser, parseValidateIf),
    ajv: (ajv) => ajv.addKeyword(validateAnyKeyword),
    constructJSONSchemaFns: [constructJSONSchemaWithValidateIf],
};
export const validateIfVisitorPlugin = {
    name: pluginName,
    initParser,
    visitor: parseValidateIf,
    ajv: (ajv) => ajv.addKeyword(validateAnyKeyword),
    constructJSONSchemaFns: [constructJSONSchemaWithValidateIf],
};
