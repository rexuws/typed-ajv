"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInt = void 0;
const message_1 = require("../message");
const decorators_1 = require("../utils/decorators");
const isInt = (0, decorators_1.makeValidationDecorator)({}, (_, propertyKey, designType, opts, arg = {}) => {
    var _a, _b;
    return {
        constraint: {
            type: 'integer',
            errorMessage: {
                type: (_a = opts.errorMessage) !== null && _a !== void 0 ? _a : message_1.MESSAGE.NUMBER.IS_INT(propertyKey),
            },
        },
        typeDef: {
            type: (_b = arg.type) !== null && _b !== void 0 ? _b : 'int32',
            isArray: typeof opts.each === 'boolean' ? opts.each : designType === Array,
            nullable: true,
        },
    };
});
/**
 * Check if the string is a valid string
 */
exports.IsInt = isInt;
