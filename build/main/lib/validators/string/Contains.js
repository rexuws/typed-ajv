"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contains = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const utils_1 = require("./utils");
const contains = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const val = (0, utils_1.escapeString)(arg);
    return {
        constraint: {
            pattern: val,
            errorMessage: {
                pattern: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.CONTAINS(propertyKey, arg),
            },
        },
    };
});
/**
 * Check if the string contains the given string.
 */
exports.Contains = contains;
