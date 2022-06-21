import validator from 'validator';

import { MESSAGE } from '../message';
import { ValidateErrorMessage } from '../types';
import { makeValidationDecorator } from '../utils/decorators';

type IsRgbOptions = {
  includePercentValues?: boolean;
};

const getIsRgbColorValidator =
  (includePercentValue: boolean) => (value: string) =>
    validator.isRgbColor(value, includePercentValue);

const isRgbColor = makeValidationDecorator<
  string | string[],
  ValidateErrorMessage,
  IsRgbOptions | undefined
>({}, (_, propertyKey, __, opts, arg = {}) => {
  const { errorMessage } = opts;

  const formatName = `IsRGB${
    arg.includePercentValues ? 'includePercentValues' : ''
  }`;

  return {
    constraint: {
      format: formatName,
      errorMessage: {
        format: errorMessage ?? MESSAGE.STRING.IS_RGB_COLOR(propertyKey),
      },
    },
    format: {
      name: formatName,
      type: 'string',
      validate: getIsRgbColorValidator(!!arg.includePercentValues),
    },
  };
});

type IsRgbColorFn = typeof isRgbColor;

/**
 * Check if the string is a rgb or rgba color.
 */
export const IsRgbColor: (
  ...args: Parameters<IsRgbColorFn>
) => ReturnType<IsRgbColorFn> = isRgbColor;
