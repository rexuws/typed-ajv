"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRgbColor = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const getIsRgbColorValidator = (includePercentValue) => (value) => validator_1.default.isRgbColor(value, includePercentValue);
const isRgbColor = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts, arg = {}) => {
    const { errorMessage } = opts;
    const formatName = `IsRGB${arg.includePercentValues ? 'includePercentValues' : ''}`;
    return {
        constraint: {
            format: formatName,
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_RGB_COLOR(propertyKey),
            },
        },
        format: {
            name: formatName,
            type: 'string',
            validate: getIsRgbColorValidator(!!arg.includePercentValues),
        },
    };
});
/**
 * Check if the string is a rgb or rgba color.
 */
exports.IsRgbColor = isRgbColor;
