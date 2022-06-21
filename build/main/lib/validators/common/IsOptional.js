"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOptional = void 0;
const utils_1 = require("../utils");
const isOptional = (0, utils_1.makeValidationDecorator)({
    allowEmpty: true,
});
/**
 * Checks if value is missing and if so, ignores all validators.
 */
exports.IsOptional = isOptional;
