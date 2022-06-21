import { MetaStorage } from '../common/MetaStorage';
const RUNTIME_TYPE = [
    String,
    Number,
    Boolean,
    Array,
    Object,
    Function,
];
export const makePropertyDecorator = (meta, applyFnMeta) => {
    return (fn) => (target, key) => {
        const designType = Reflect.getMetadata('design:type', target, key);
        if (applyFnMeta) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            MetaStorage.apply(target, key, applyFnMeta(meta, fn, key, designType));
            return;
        }
        MetaStorage.apply(target, key, meta);
    };
};
export const makeClassDecorator = (...args) => {
    console.log(args);
    return () => (target) => {
        console.log(target);
    };
};
