"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBooleanString = void 0;
const message_1 = require("../message");
const utils_1 = require("../utils");
const isBooleanString = (0, utils_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            enum: ['true', 'false', '0', '1'],
            errorMessage: {
                enum: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_BOOLEAN_STRING(propertyKey),
            },
        },
    };
});
/**
 * Check if the string is a boolean string (true, false, 0, 1)
 */ exports.IsBooleanString = isBooleanString;
