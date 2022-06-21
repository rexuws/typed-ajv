"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIf = void 0;
const utils_1 = require("../../../utils");
const validateIf = (0, utils_1.makeValidationDecorator)({}, (_, __, ___, options, arg) => {
    if (typeof arg === 'string')
        return {
            validateIf: {
                validatorName: arg,
            },
        };
    const { dependency } = options;
    return {
        validateIf: {
            validator: arg,
            dependency,
        },
    };
});
exports.ValidateIf = validateIf;
