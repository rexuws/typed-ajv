"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnyKeyword = void 0;
exports.validateAnyKeyword = {
    keyword: 'validateAny',
    modifying: true,
    schema: true,
    validate(fn, value, _, data) {
        return fn(value, data.parentData, data.rootData, this);
    },
    errors: false,
};
