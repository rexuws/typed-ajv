"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage$ = exports.patchReportError = void 0;
const ajv_1 = require("ajv");
const errorFns = __importStar(require("ajv/dist/compile/errors"));
const KEYWORD = 'errorMessage';
let patchedReportError = false;
const findMessage = (schema, keyword) => {
    return typeof schema.errorMessage === 'object'
        ? schema.errorMessage[keyword]
        : schema.errorMessage;
};
const getCustomError = (cxt) => {
    const { parentSchema, keyword } = cxt;
    if (!parentSchema)
        return;
    const message = findMessage(parentSchema, keyword);
    if (!message)
        return;
    if (typeof message === 'string')
        return {
            message: () => (0, ajv_1.str) `${message}`,
        };
    return {
        message: (p) => {
            return (0, ajv_1.str) `${message(p.params.param)}`;
        },
    };
    // return;
};
const patchReportError = () => {
    if (patchedReportError)
        return;
    const { reportError: _reportError } = errorFns;
    errorFns.reportError = (...args) => {
        const cxt = args[0];
        const errArg = args[1];
        const [, , ...rest] = args;
        const customErr = getCustomError(cxt);
        // console.log('intercepted');
        return _reportError(cxt, customErr ? Object.assign(Object.assign({}, errArg), customErr) : errArg, ...rest);
    };
    patchedReportError = true;
};
exports.patchReportError = patchReportError;
const errorMessage$ = () => ({
    keyword: KEYWORD,
    schemaType: ['object'],
    post: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    code: () => { },
    metaSchema: {
        anyOf: [
            { type: 'string' },
            {
                type: 'object',
                properties: {
                    properties: { $ref: '#/$defs/messageType' },
                    // items: { $ref: '#/$defs/stringList' },
                    // required: { $ref: '#/$defs/stringOrMap' },
                    // dependencies: { $ref: '#/$defs/stringOrMap' },
                },
                additionalProperties: {
                    anyOf: [{ type: 'string' }, { typeof: 'function' }],
                },
            },
        ],
        $defs: {
            messageType: {
                anyOf: [
                    {
                        type: 'string',
                    },
                    {
                        typeof: 'function',
                    },
                ],
            },
        },
    },
});
exports.errorMessage$ = errorMessage$;
