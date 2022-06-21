"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const MetaStorage_1 = require("../common/MetaStorage");
function Type(cls, typeOptions) {
    return (target, key) => {
        const type = Reflect.getMetadata('design:type', target, key);
        const isArray = type === Array;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MetaStorage_1.MetaStorage.apply(target, key, {
            typeDef: {
                class: cls,
                isArray,
                validateNested: typeOptions === null || typeOptions === void 0 ? void 0 : typeOptions.validateNested,
            },
        });
    };
}
exports.Type = Type;
