"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDataUri = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isDateUri = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isDataUri',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_DATA_URI(propertyKey),
            },
        },
        format: {
            name: 'isDataUri',
            type: 'string',
            autoRename: true,
            validate: validator_1.default.isDataURI,
        },
    };
});
/**
 * Checks if the string is a valid data uri format.
 */
exports.IsDataUri = isDateUri;
