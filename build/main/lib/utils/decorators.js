"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClassDecorator = exports.makePropertyDecorator = void 0;
const MetaStorage_1 = require("../common/MetaStorage");
const RUNTIME_TYPE = [
    String,
    Number,
    Boolean,
    Array,
    Object,
    Function,
];
const makePropertyDecorator = (meta, applyFnMeta) => {
    return (fn) => (target, key) => {
        const designType = Reflect.getMetadata('design:type', target, key);
        if (applyFnMeta) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            MetaStorage_1.MetaStorage.apply(target, key, applyFnMeta(meta, fn, key, designType));
            return;
        }
        MetaStorage_1.MetaStorage.apply(target, key, meta);
    };
};
exports.makePropertyDecorator = makePropertyDecorator;
const makeClassDecorator = (...args) => {
    console.log(args);
    return () => (target) => {
        console.log(target);
    };
};
exports.makeClassDecorator = makeClassDecorator;
