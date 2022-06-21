"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotContains = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const utils_1 = require("./utils");
const notContains = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const val = (0, utils_1.escapeString)(arg);
    return {
        constraint: {
            not: {
                pattern: val,
            },
            errorMessage: {
                pattern: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
                not: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.NOT_CONTAINS(propertyKey, arg),
            },
        },
    };
});
/**
 * Check if the string does not contain the given string.
 */
exports.NotContains = notContains;
