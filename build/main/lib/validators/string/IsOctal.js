"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOctal = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isOctal = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isOctal',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_OCTAL(propertyKey),
            },
        },
        format: {
            name: 'isOctal',
            type: 'string',
            validate: validator_1.default.isOctal,
        },
    };
});
/**
 * Check if the string is a valid octal number.
 */
exports.IsOctal = isOctal;
