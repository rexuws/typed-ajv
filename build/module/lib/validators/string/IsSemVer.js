import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isSemVer = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isSemVer',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_SEM_VER(propertyKey),
            },
        },
        format: {
            name: 'isSemVer',
            type: 'string',
            validate: validator.isSemVer,
        },
    };
});
/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
export const IsSemver = isSemVer;
