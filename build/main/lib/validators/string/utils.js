"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRING_PATTERNS = exports.escapeString = void 0;
const escapeString = (str) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
exports.escapeString = escapeString;
exports.STRING_PATTERNS = {
    IS_ALPHA: '^[A-Za-z]+$',
    IS_ALPHANUMERIC: '^[A-Za-z0-9]+$',
    IS_ASCII: '^[\x00-\x7F]+$',
    IS_BASE32: /^[A-Z2-7]+=*$/,
    IS_CREDIT_CARD: '^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$',
};
