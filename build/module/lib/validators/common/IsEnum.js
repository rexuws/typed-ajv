import { MetaStorage } from '../../common/MetaStorage';
import { MESSAGE } from '../message';
export function IsEnum(values, options) {
    return (target, key) => {
        MetaStorage.apply(target, key, {
            constraint: {
                enum: values,
                errorMessage: {
                    enum: options?.errorMessage ?? MESSAGE.PROP.IS_ENUM(values),
                },
            },
        });
    };
}
