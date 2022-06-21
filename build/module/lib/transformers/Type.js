import { MetaStorage } from '../common/MetaStorage';
export function Type(cls, typeOptions) {
    return (target, key) => {
        const type = Reflect.getMetadata('design:type', target, key);
        const isArray = type === Array;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MetaStorage.apply(target, key, {
            typeDef: {
                class: cls,
                isArray,
                validateNested: typeOptions?.validateNested,
            },
        });
    };
}
