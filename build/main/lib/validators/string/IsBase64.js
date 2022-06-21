"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBase64 = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const utils_1 = require("../utils");
const isBase64 = (0, utils_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'base64',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_BASE64(propertyKey),
            },
        },
        format: {
            name: 'base64',
            type: 'string',
            validate: validator_1.default.isBase64,
        },
    };
});
/**
 * Checks if a string is base64 encoded.
 */
exports.IsBase64 = isBase64;
