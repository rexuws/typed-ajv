"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSemver = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isSemVer = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isSemVer',
            errorMessage: {
                format: errorMessage !== null && errorMessage !== void 0 ? errorMessage : message_1.MESSAGE.STRING.IS_SEM_VER(propertyKey),
            },
        },
        format: {
            name: 'isSemVer',
            type: 'string',
            validate: validator_1.default.isSemVer,
        },
    };
});
/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
exports.IsSemver = isSemVer;
