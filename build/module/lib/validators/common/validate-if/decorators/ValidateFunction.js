import { MetaStorage } from '../../../../common/MetaStorage';
import { VALIDATE_FUNCTION } from '../constants';
export const ValidateFunction = (name, dependency, fn) => (target) => {
    const exist = MetaStorage.get(target, VALIDATE_FUNCTION, VALIDATE_FUNCTION);
    if (exist) {
        exist[name] = {
            dependency: dependency,
            fn: fn,
        };
        return target;
    }
    MetaStorage._apply(target, VALIDATE_FUNCTION, {
        [name]: { dependency: dependency, fn: fn },
    });
    return target;
};
