import { MetaStorage } from '../../common/MetaStorage';
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
export function makeValidationDecorator(meta, applyFnMeta) {
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
                return MetaStorage.apply(target, key, applyFnMeta(meta, key, designType, opts ?? {}, arg));
            return MetaStorage.apply(target, key, applyFnMeta(meta, key, designType, opts ?? {}));
        }
        MetaStorage.apply(target, key, meta);
    };
    return fn;
}
