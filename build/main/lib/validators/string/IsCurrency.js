"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCurrency = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isCurrency = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, designType, opts, arg) => {
    const { errorMessage, currencyOption = {} } = opts;
    const currencyOpt = Object.assign(Object.assign({}, arg), currencyOption);
    const validate = (str) => {
        return validator_1.default.isCurrency(str, currencyOpt);
    };
    return {
        constraint: {
            format: 'currency',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_CURRENCY(propertyKey),
            },
        },
        format: {
            name: 'currency',
            type: 'string',
            autoRename: true,
            validate,
        },
    };
});
/**
 * Checks if the string is a valid currency amount.
 */
exports.IsCurrency = isCurrency;
