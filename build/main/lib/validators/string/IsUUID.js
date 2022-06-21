"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUUID = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isUUID = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'uuid',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_UUID(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is an url.
 */
exports.IsUUID = isUUID;
