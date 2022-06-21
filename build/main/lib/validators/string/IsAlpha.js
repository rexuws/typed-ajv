"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAlpha = exports.isAlpha = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const utils_1 = require("./utils");
exports.isAlpha = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            pattern: utils_1.STRING_PATTERNS.IS_ALPHA,
            errorMessage: {
                pattern: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_ALPHA(propertyKey),
            },
        },
    };
});
/**
 * Check if the string contains only alphabetic characters.
 */
exports.IsAlpha = exports.isAlpha;
