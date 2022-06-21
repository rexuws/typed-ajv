import { ValidateErrorMessage } from '../types';
declare const isMongoId: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsMongoIdFn = typeof isMongoId;
/**
 * Check if the string is a valid hex-encoded representation of a [MongoDB ObjectId](http://docs.mongodb.org/manual/reference/object-id/).
 */
export declare const IsMongoId: (...args: Parameters<IsMongoIdFn>) => ReturnType<IsMongoIdFn>;
export {};
