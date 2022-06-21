"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBase32 = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const utils_1 = require("./utils");
const isBase32Validator = (str) => str.length % 8 === 0 && utils_1.STRING_PATTERNS.IS_BASE32.test(str);
const isBase32 = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'base32',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_BASE32(propertyKey),
            },
        },
        format: {
            name: 'base32',
            type: 'string',
            validate: isBase32Validator,
        },
    };
});
/**
 * Check if a string is a valid base32 string
 */
exports.IsBase32 = isBase32;
