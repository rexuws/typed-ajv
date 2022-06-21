export const MESSAGE = {
    STRING: {
        CONTAINS: (propertyKey, str) => `${propertyKey} must contain '${str}'`,
        IS_ALPHA: (propertyKey) => `'${propertyKey}' must contain only letters (a-zA-Z)`,
        IS_ALPHANUMERIC: (propertyKey) => `'${propertyKey}' must contain only letters and numbers`,
        IS_ASCII: (propertyKey) => `'${propertyKey}' must contain only ASCII characters`,
        IS_BASE32: (propertyKey) => `'${propertyKey}' must be base32 encoded`,
        IS_BASE64: (propertyKey) => `'${propertyKey}' must be base64 encoded`,
        IS_BOOLEAN_STRING: (propertyKey) => `'${propertyKey}' must be a boolean string`,
        IS_CREDIT_CARD: (propertyKey) => `'${propertyKey}' must be a credit card`,
        IS_CURRENCY: (propertyKey) => `'${propertyKey}' must be a currency`,
        IS_DATA_URI: (propertyKey) => `'${propertyKey}' must be a data uri format`,
        IS_DATE_STRING: (propertyKey) => `'${propertyKey}' must be a valid ISO 8601 date string`,
        IS_DECIMAL: (propertyKey) => `'${propertyKey}' must be a valid decimal number`,
        IS_EAN: (propertyKey) => `'${propertyKey}' must be an EAN (European Article Number)`,
        IS_EMAIL: (propertyKey) => `'${propertyKey}' must be a valid email`,
        IS_ETHEREUM_ADDRESS: (propertyKey) => `'${propertyKey}' must be a valid ethereum address`,
        IS_HASH: (propertyKey, algorithm) => `'${propertyKey}' must be a hash of type ${algorithm}`,
        IS_HEXADECIMAL: (propertyKey) => `'${propertyKey}' must be a valid hexadecimal number`,
        IS_HEX_COLOR: (propertyKey) => `'${propertyKey}' must be a valid hexadecimal color`,
        IS_HSL: (propertyKey) => `'${propertyKey}' must be a HSL color`,
        IS_IBAN: (propertyKey) => `'${propertyKey}' must be a valid IBAN`,
        IS_IP: (propertyKey, ipVersion) => `'${propertyKey}' must be an ip address of ${ipVersion}`,
        IS_ISBN: (propertyKey, isbnVersion) => `'${propertyKey}' must be an ISBN of version ${isbnVersion}`,
        IS_JSON: (propertyKey) => `'${propertyKey}' must be a valid JSON`,
        IS_JWT: (propertyKey) => `'${propertyKey}' must be a valid JWT`,
        IS_LOCALE: (propertyKey) => `'${propertyKey}' must be a valid locale`,
        IS_LOWERCASE: (propertyKey) => `'${propertyKey}' must be a lowercase string`,
        IS_MAC_ADDRESS: (propertyKey) => `'${propertyKey}' must be a valid mac address`,
        IS_MAGNET_URI: (propertyKey) => `'${propertyKey}' must be a valid magnet uri`,
        IS_MIME_TYPE: (propertyKey) => `'${propertyKey}' must be a valid MIME type`,
        IS_MOBILE_PHONE: (propertyKey) => `'${propertyKey}' must be a valid phone number`,
        IS_MONGO_ID: (propertyKey) => `'${propertyKey}' must be a valid mongo id`,
        IS_NUMBER_STRING: (propertyKey) => `'${propertyKey}' must be a number string`,
        IS_OCTAL: (propertyKey) => `'${propertyKey}' must be a octal number`,
        IS_PORT: (propertyKey) => `'${propertyKey}' must be a valid port number`,
        IS_POSTAL_CODE: (propertyKey) => `'${propertyKey}' must be a valid postal code`,
        IS_RGB_COLOR: (propertyKey) => `'${propertyKey}' must be a RGB color`,
        IS_SEM_VER: (propertyKey) => `'${propertyKey}' must be a Semantic Versioning Specification`,
        IS_UPPERCASE: (propertyKey) => `'${propertyKey}' must be a uppercase string`,
        IS_URL: (propertyKey) => `'${propertyKey}' must be a valid URL address`,
        IS_UUID: (propertyKey) => `'${propertyKey}' must be a valid UUID`,
        IS_STRING: (propertyKey) => `'${propertyKey}' must be a string`,
        MAX_LENGTH: (propertyKey, maxLength) => `'${propertyKey}' must be shorter than or equal to ${maxLength} characters`,
        MIX_LENGTH: (propertyKey, minLength) => `'${propertyKey}' must be longer than or equal to ${minLength} characters`,
        NOT_CONTAINS: (propertyKey, str) => `${propertyKey} must not contain '${str}'`,
    },
    NUMBER: {
        IS_INT: (propertyKey) => `'${propertyKey}' must be an integer number`,
        IS_NUMBER: (propertyKey) => `'${propertyKey}' must be a number`,
    },
    PROP: {
        IS_ENUM: (values) => `\${0#} must contain of enum values: ${values.join(', ')}`,
    },
};
