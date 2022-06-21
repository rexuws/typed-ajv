"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCreditCard = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isCreditCard = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'creditCard',
            errorMessage: {
                pattern: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_CREDIT_CARD(propertyKey),
            },
        },
        format: {
            name: 'creditCard',
            type: 'string',
            validate: validator_1.default.isCreditCard,
        },
    };
});
/**
 * Checks if the string is a credit card.
 */
exports.IsCreditCard = isCreditCard;
