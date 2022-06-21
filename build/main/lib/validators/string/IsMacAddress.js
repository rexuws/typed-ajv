"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMacAddress = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const getIsMacAddressValidator = (noColon = false) => (value) => validator_1.default.isMACAddress(value, { no_colons: noColon });
const isMacAddress = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const formatName = `isMacAddress${arg.no_colons ? 'NoColons' : ''}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_MAC_ADDRESS(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsMacAddressValidator(arg.no_colons),
        },
    };
});
/**
 * Check if the string is a MAC address.
 */
exports.IsMacAddress = isMacAddress;
