"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPostalCode = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const getIsPostalCodeValidator = (locale) => {
    return (value) => validator_1.default.isPostalCode(value, locale);
};
const isPostalCode = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg = 'any') => {
    const { errorMessage } = opts;
    const formatName = `isNumberString_${arg}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_POSTAL_CODE(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsPostalCodeValidator(arg),
        },
    };
});
/**
 * CCheck if the string is a postal code
 */
exports.IsPostalCode = isPostalCode;
