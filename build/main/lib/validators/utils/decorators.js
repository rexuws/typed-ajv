"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeValidationDecorator = void 0;
const MetaStorage_1 = require("../../common/MetaStorage");
const RUNTIME_TYPE = [
    String,
    Number,
    Boolean,
    Array,
    Object,
    Function,
];
/**
 *
 * @param meta
 * @param applyFnMeta
 * @returns A function
 */
function makeValidationDecorator(meta, applyFnMeta) {
    const fn = (...args) => (target, key) => {
        const designType = Reflect.getMetadata('design:type', target, key);
        const [argOrOptions, options] = args;
        let arg = undefined;
        let opts = undefined;
        if (options) {
            arg = argOrOptions;
            opts = options;
        }
        else {
            if (typeof argOrOptions !== 'object') {
                arg = argOrOptions;
            }
            else if ('errorMessage' in argOrOptions ||
                'each' in argOrOptions ||
                'validateNested' in argOrOptions) {
                arg = undefined;
                opts = argOrOptions;
            }
            else {
                arg = argOrOptions;
            }
        }
        if (applyFnMeta) {
            if (arg !== undefined)
                // @ts-ignore
                return MetaStorage_1.MetaStorage.apply(target, key, applyFnMeta(meta, key, designType, opts !== null && opts !== void 0 ? opts : {}, arg));
            return MetaStorage_1.MetaStorage.apply(target, key, applyFnMeta(meta, key, designType, opts !== null && opts !== void 0 ? opts : {}));
        }
        MetaStorage_1.MetaStorage.apply(target, key, meta);
    };
    return fn;
}
exports.makeValidationDecorator = makeValidationDecorator;
