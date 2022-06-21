"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateString = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isDateString = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'date',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_DATE_STRING(propertyKey),
            },
        },
    };
});
/**
 * Checks if the string is a valid ISO 8601 date.
 */
exports.IsDateString = isDateString;
