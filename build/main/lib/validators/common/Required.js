"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Required = void 0;
const utils_1 = require("../utils");
const required = (0, utils_1.makeValidationDecorator)({
    allowEmpty: false,
});
/**
 * Return error is value is missing
 *
 * @default true
 */
exports.Required = required;
