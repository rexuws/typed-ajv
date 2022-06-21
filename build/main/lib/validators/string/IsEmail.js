"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmail = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isEmail = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'email',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_EMAIL(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is a valid email address.
 */
exports.IsEmail = isEmail;
// IsDecimal({})
