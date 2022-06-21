import { ValidateErrorMessage } from '../types';
declare const isEthereum: (options?: ValidateErrorMessage | undefined) => import("../../common").TypedPropertyDecorator<string | string[]>;
declare type IsEthereumFn = typeof isEthereum;
/**
 * Check if the string is an [Ethereum](https://ethereum.org/) address using basic regex. Does not validate address checksums.
 */
export declare const IsEthereumAddress: (...args: Parameters<IsEthereumFn>) => ReturnType<IsEthereumFn>;
export {};
