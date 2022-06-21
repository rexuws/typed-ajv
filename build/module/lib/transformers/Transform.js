import { MetaStorage } from '../common/MetaStorage';
export function Transform(transform) {
    return (target, key) => {
        MetaStorage.apply(target, key, {
            transform: transform,
        });
    };
}
