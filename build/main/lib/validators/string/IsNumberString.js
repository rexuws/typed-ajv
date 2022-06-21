"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberString = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const getIsNumberStringValidator = (noSymbol) => {
    if (noSymbol) {
        return (value) => validator_1.default.isNumeric(value);
    }
    return (value) => validator_1.default.isNumeric(value, { no_symbols: true });
};
const isNumberString = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const formatName = `isNumberString_${arg.no_symbols ? 'no_symbols' : ''}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_NUMBER_STRING(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsNumberStringValidator(arg.no_symbols),
        },
    };
});
/**
 * Check if the string contains only numbers.
 */
exports.IsNumberString = isNumberString;
