"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsString = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isString = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, designType, opts) => {
    var _a;
    return {
        constraint: {
            type: 'string',
            errorMessage: {
                type: (_a = opts.errorMessage) !== null && _a !== void 0 ? _a : message_1.MESSAGE.STRING.IS_STRING(propertyKey),
            },
        },
        typeDef: {
            type: 'string',
            isArray: typeof opts.each === 'boolean' ? opts.each : designType === Array,
            nullable: true,
        },
    };
});
/**
 * Check if the string is a valid string
 */
exports.IsString = isString;
