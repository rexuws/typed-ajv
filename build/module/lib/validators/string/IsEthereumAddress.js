import validator from 'validator';
import { MESSAGE } from '../message';
import { makeValidationDecorator } from '../utils/decorators';
const isEthereum = makeValidationDecorator({}, (_, propertyKey, __, opts) => {
    const { errorMessage } = opts;
    return {
        constraint: {
            format: 'isEthereumAddress',
            errorMessage: {
                format: errorMessage ?? MESSAGE.STRING.IS_ETHEREUM_ADDRESS(propertyKey),
            },
        },
        format: {
            name: 'isEthereumAddress',
            type: 'string',
            validate: validator.isEthereumAddress,
        },
    };
});
/**
 * Check if the string is an [Ethereum](https://ethereum.org/) address using basic regex. Does not validate address checksums.
 */
export const IsEthereumAddress = isEthereum;
// IsDecimal({})
