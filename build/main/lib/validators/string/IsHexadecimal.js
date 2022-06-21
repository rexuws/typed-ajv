"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHexadecimal = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isHexadecimal = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isHexadecimal',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_HEXADECIMAL(propertyKey),
            },
        },
        format: {
            name: 'isHexadecimal',
            type: 'string',
            validate: validator_1.default.isHexadecimal,
        },
    };
});
/**
 * Check if the string is a hexadecimal number.
 */
exports.IsHexadecimal = isHexadecimal;
