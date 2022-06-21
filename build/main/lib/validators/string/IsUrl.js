"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUrl = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isUrl = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'uri',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_URL(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is an url.
 */
exports.IsUrl = isUrl;
