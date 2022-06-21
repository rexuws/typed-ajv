"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMobilePhone = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isMobilePhone = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const validate = (value) => validator_1.default.isMobilePhone(value, arg, opts);
    return {
        constraint: {
            format: 'isMobilePhone',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_MOBILE_PHONE(propertyKey),
            },
        },
        format: {
            name: 'isMobilePhone',
            type: 'string',
            validate,
            autoRename: true,
        },
    };
});
/**
 * Check if the string is a mobile phone number.
 */
exports.IsMobilePhone = isMobilePhone;
