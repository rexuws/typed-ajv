"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDecimal = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isDecimal = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const validate = (str) => {
        return validator_1.default.isDecimal(str, arg);
    };
    return {
        constraint: {
            format: 'isDecimal',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_DECIMAL(propertyKey),
            },
        },
        format: {
            name: 'isDecimal',
            type: 'string',
            validate,
            autoRename: true,
        },
    };
});
/**
 * Checks if the string is a decimal number.
 */
exports.IsDecimal = isDecimal;
// IsDecimal({})
