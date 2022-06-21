export const MESSAGE = {
  STRING: {
    CONTAINS: (propertyKey: string, str: string) =>
      `${propertyKey} must contain '${str}'`,
    IS_ALPHA: (propertyKey: string) =>
      `'${propertyKey}' must contain only letters (a-zA-Z)`,
    IS_ALPHANUMERIC: (propertyKey: string) =>
      `'${propertyKey}' must contain only letters and numbers`,
    IS_ASCII: (propertyKey: string) =>
      `'${propertyKey}' must contain only ASCII characters`,
    IS_BASE32: (propertyKey: string) =>
      `'${propertyKey}' must be base32 encoded`,
    IS_BASE64: (propertyKey: string) =>
      `'${propertyKey}' must be base64 encoded`,
    IS_BOOLEAN_STRING: (propertyKey: string) =>
      `'${propertyKey}' must be a boolean string`,
    IS_CREDIT_CARD: (propertyKey: string) =>
      `'${propertyKey}' must be a credit card`,
    IS_CURRENCY: (propertyKey: string) => `'${propertyKey}' must be a currency`,
    IS_DATA_URI: (propertyKey: string) =>
      `'${propertyKey}' must be a data uri format`,
    IS_DATE_STRING: (propertyKey: string) =>
      `'${propertyKey}' must be a valid ISO 8601 date string`,
    IS_DECIMAL: (propertyKey: string) =>
      `'${propertyKey}' must be a valid decimal number`,
    IS_EAN: (propertyKey: string) =>
      `'${propertyKey}' must be an EAN (European Article Number)`,
    IS_EMAIL: (propertyKey: string) => `'${propertyKey}' must be a valid email`,
    IS_ETHEREUM_ADDRESS: (propertyKey: string) =>
      `'${propertyKey}' must be a valid ethereum address`,
    IS_HASH: (propertyKey: string, algorithm: string) =>
      `'${propertyKey}' must be a hash of type ${algorithm}`,
    IS_HEXADECIMAL: (propertyKey: string) =>
      `'${propertyKey}' must be a valid hexadecimal number`,
    IS_HEX_COLOR: (propertyKey: string) =>
      `'${propertyKey}' must be a valid hexadecimal color`,
    IS_HSL: (propertyKey: string) => `'${propertyKey}' must be a HSL color`,
    IS_IBAN: (propertyKey: string) => `'${propertyKey}' must be a valid IBAN`,
    IS_IP: (propertyKey: string, ipVersion: string) =>
      `'${propertyKey}' must be an ip address of ${ipVersion}`,
    IS_ISBN: (propertyKey: string, isbnVersion: string | number) =>
      `'${propertyKey}' must be an ISBN of version ${isbnVersion}`,
    IS_JSON: (propertyKey: string) => `'${propertyKey}' must be a valid JSON`,
    IS_JWT: (propertyKey: string) => `'${propertyKey}' must be a valid JWT`,
    IS_LOCALE: (propertyKey: string) =>
      `'${propertyKey}' must be a valid locale`,
    IS_LOWERCASE: (propertyKey: string) =>
      `'${propertyKey}' must be a lowercase string`,
    IS_MAC_ADDRESS: (propertyKey: string) =>
      `'${propertyKey}' must be a valid mac address`,
    IS_MAGNET_URI: (propertyKey: string) =>
      `'${propertyKey}' must be a valid magnet uri`,
    IS_MIME_TYPE: (propertyKey: string) =>
      `'${propertyKey}' must be a valid MIME type`,
    IS_MOBILE_PHONE: (propertyKey: string) =>
      `'${propertyKey}' must be a valid phone number`,
    IS_MONGO_ID: (propertyKey: string) =>
      `'${propertyKey}' must be a valid mongo id`,
    IS_NUMBER_STRING: (propertyKey: string) =>
      `'${propertyKey}' must be a number string`,
    IS_OCTAL: (propertyKey: string) =>
      `'${propertyKey}' must be a octal number`,
    IS_PORT: (propertyKey: string) =>
      `'${propertyKey}' must be a valid port number`,
    IS_POSTAL_CODE: (propertyKey: string) =>
      `'${propertyKey}' must be a valid postal code`,
    IS_RGB_COLOR: (propertyKey: string) =>
      `'${propertyKey}' must be a RGB color`,
    IS_SEM_VER: (propertyKey: string) =>
      `'${propertyKey}' must be a Semantic Versioning Specification`,
    IS_UPPERCASE: (propertyKey: string) =>
      `'${propertyKey}' must be a uppercase string`,
    IS_URL: (propertyKey: string) =>
      `'${propertyKey}' must be a valid URL address`,
    IS_UUID: (propertyKey: string) => `'${propertyKey}' must be a valid UUID`,
    IS_STRING: (propertyKey: string) => `'${propertyKey}' must be a string`,
    MAX_LENGTH: (propertyKey: string, maxLength: number) =>
      `'${propertyKey}' must be shorter than or equal to ${maxLength} characters`,
    MIX_LENGTH: (propertyKey: string, minLength: number) =>
      `'${propertyKey}' must be longer than or equal to ${minLength} characters`,
    NOT_CONTAINS: (propertyKey: string, str: string) =>
      `${propertyKey} must not contain '${str}'`,
  },
  NUMBER: {
    IS_INT: (propertyKey: string) =>
      `'${propertyKey}' must be an integer number`,
    IS_NUMBER: (propertyKey: string) => `'${propertyKey}' must be a number`,
  },
  PROP: {
    IS_ENUM: (values: unknown[]) =>
      `\${0#} must contain of enum values: ${values.join(', ')}`,
  },
};
