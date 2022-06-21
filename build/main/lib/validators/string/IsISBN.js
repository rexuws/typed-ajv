"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsISBN = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isISBN10 = (value) => validator_1.default.isISBN(value, 10);
const isISBN13 = (value) => validator_1.default.isISBN(value, 13);
const isISBN = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const formatName = `isISBN${arg}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_ISBN(propertyKey, arg),
            },
        },
        format: {
            name: 'isISBN',
            type: 'string',
            validate: formatName === 'isISBN10' ? isISBN10 : isISBN13,
        },
    };
});
/**
 * Check if the string is an ISBN (version 10 or 13).
 */
exports.IsISBN = isISBN;
