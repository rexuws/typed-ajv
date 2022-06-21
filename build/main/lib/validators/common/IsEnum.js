"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEnum = void 0;
const MetaStorage_1 = require("../../common/MetaStorage");
const message_1 = require("../message");
function IsEnum(values, options) {
    return (target, key) => {
        var _a;
        MetaStorage_1.MetaStorage.apply(target, key, {
            constraint: {
                enum: values,
                errorMessage: {
                    enum: (_a = options === null || options === void 0 ? void 0 : options.errorMessage) !== null && _a !== void 0 ? _a : message_1.MESSAGE.PROP.IS_ENUM(values),
                },
            },
        });
    };
}
exports.IsEnum = IsEnum;
