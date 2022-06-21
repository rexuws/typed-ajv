"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFunction = void 0;
const MetaStorage_1 = require("../../../../common/MetaStorage");
const constants_1 = require("../constants");
const ValidateFunction = (name, dependency, fn) => (target) => {
    const exist = MetaStorage_1.MetaStorage.get(target, constants_1.VALIDATE_FUNCTION, constants_1.VALIDATE_FUNCTION);
    if (exist) {
        exist[name] = {
            dependency: dependency,
            fn: fn,
        };
        return target;
    }
    MetaStorage_1.MetaStorage._apply(target, constants_1.VALIDATE_FUNCTION, {
        [name]: { dependency: dependency, fn: fn },
    });
    return target;
};
exports.ValidateFunction = ValidateFunction;
