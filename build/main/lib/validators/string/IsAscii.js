"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAscii = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const utils_1 = require("./utils");
const isAscii = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            pattern: utils_1.STRING_PATTERNS.IS_ASCII,
            errorMessage: {
                pattern: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_ASCII(propertyKey),
            },
        },
    };
});
/**
 * Check if the string contains only ASCII characters
 */ exports.IsAscii = isAscii;
