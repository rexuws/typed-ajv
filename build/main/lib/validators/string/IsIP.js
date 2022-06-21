"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIP = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isIP = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: arg,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_IP(propertyKey, arg),
            },
        },
    };
});
/**
 * Checks if the string is an IP (version 4 or 6).
 */
exports.IsIP = isIP;
