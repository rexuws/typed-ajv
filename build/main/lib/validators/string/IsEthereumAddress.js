"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEthereumAddress = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isEthereum = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isEthereumAddress',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_ETHEREUM_ADDRESS(propertyKey),
            },
        },
        format: {
            name: 'isEthereumAddress',
            type: 'string',
            validate: validator_1.default.isEthereumAddress,
        },
    };
});
/**
 * Check if the string is an [Ethereum](https://ethereum.org/) address using basic regex. Does not validate address checksums.
 */
exports.IsEthereumAddress = isEthereum;
// IsDecimal({})
