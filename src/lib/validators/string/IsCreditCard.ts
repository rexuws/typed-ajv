import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

const isCreditCard = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage
>({}, (_, propertyKey, __, opts) => {
  const { errorMessage } = opts;

  return {
    constraint: {
      format: 'creditCard',
      errorMessage: {
        pattern: errorMessage ?? MESSAGE.STRING.IS_CREDIT_CARD(propertyKey),
      },
    },
    format: {
      name: 'creditCard',
      type: 'string',
      validate: validator.isCreditCard,
    },
  };
});

type IsCreditCardFn = typeof isCreditCard;

/**
 * Checks if the string is a credit card.
 */
export const IsCreditCard: (
  ...args: Parameters<IsCreditCardFn>
) => ReturnType<IsCreditCardFn> = isCreditCard;
