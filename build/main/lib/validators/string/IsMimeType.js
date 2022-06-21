"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMimeType = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isMimeType = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isMimeType',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_MIME_TYPE(propertyKey),
            },
        },
        format: {
            name: 'isMimeType',
            type: 'string',
            validate: validator_1.default.isMimeType,
        },
    };
});
/**
 * Check if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format.
 */
exports.IsMimeType = isMimeType;
