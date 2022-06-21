"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinLength = void 0;
const message_1 = require("../message");
const utils_1 = require("../utils");
const minLength = (0, utils_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            minLength: arg,
            errorMessage: {
                minLength: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.MIX_LENGTH(propertyKey, arg),
            },
        },
    };
});
/**
 * Checks if the string's length is not less than given number.
 */
exports.MinLength = minLength;
