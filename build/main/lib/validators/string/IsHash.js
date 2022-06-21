"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHash = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const getIsHashValidator = (hash) => (value) => validator_1.default.isHash(value, hash);
const isHash = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg) => {
    const { errorMessage } = opts;
    const formatName = `isHash${arg}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_HASH(propertyKey, arg),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsHashValidator(arg),
        },
    };
});
/**
 * Check if the string is a hash of type algorithm.
 */
exports.IsHash = isHash;
