"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxLength = void 0;
const message_1 = require("../message");
const utils_1 = require("../utils");
const maxLength = (0, utils_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            maxLength: arg,
            errorMessage: {
                maxLength: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.MAX_LENGTH(propertyKey, arg),
            },
        },
    };
});
/**
 * Checks if the string's length is not more than given number.
 */
exports.MaxLength = maxLength;
