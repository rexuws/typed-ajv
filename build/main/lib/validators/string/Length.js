"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const message_1 = require("../message");
const utils_1 = require("../utils");
const length = (0, utils_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { max, min } = arg;
    const { errorMessage } = opts;
    return {
        constraint: {
            minLength: min,
            maxLength: max,
            errorMessage: {
                minLength: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.MIX_LENGTH(propertyKey, min),
                maxLength: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.MAX_LENGTH(propertyKey, max),
            },
        },
    };
});
/**
 * Checks if the string's length falls in a range.
 */
exports.Length = length;
