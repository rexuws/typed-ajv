import { O } from 'ts-toolbelt';
import { Meta, ParsedResult } from '../../../common/types';
import { ValidateAny } from './validate-any';
export declare type ValidateIfRef = {
    validatorName: string;
};
export declare type ValidateIfSelf = {
    dependency?: string;
    validator: ValidateAny;
};
export declare type ParsedValidateIfSelf = {
    property: string;
    dependency: string;
    fn: ValidateAny;
};
export declare type ParsedValidateIfRef = {
    property: string;
    validatorName: string;
};
export declare type ValidateIfMeta = ValidateIfRef | ValidateIfSelf;
export declare type MetaWithValidateIf = Meta & {
    validateIf?: ValidateIfMeta;
};
export declare type ParsedValidateIfResult = ParsedResult & {
    validateIf: Array<ParsedValidateIfSelf | ParsedValidateIfRef>;
};
export declare type NamedValidateFunctionsRegistry = {
    [key: string]: {
        fn: ValidateAny;
        dependency: string;
    };
};
export declare type AllOfElm = {
    fn: ValidateAny;
    then: [propertyKey: string, propertyConstraints: O.Object][];
};
export declare type AllOf = {
    [key: string]: AllOfElm;
};
export declare type AllOfSch = {
    if: {
        properties: {
            [key: string]: {
                validateAny: ValidateAny;
            };
        };
    };
    then: O.Object;
};
