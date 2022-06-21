"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaStorage = void 0;
const crypto_1 = require("crypto");
const keys_1 = require("./keys");
const log_1 = require("./log");
const logMessage = (message, target) => {
    message.forEach((m) => log_1.Logger(...m(target)));
};
/**
 * Define a metadata property on the target without
 *
 * @warning this will override any existing metadata
 */
const _apply = (target, key, value) => {
    Reflect.defineMetadata(key, value, target, key);
};
/**
 * Apply a metadata property on the target
 *
 * If the property already exists, the metadata will be merged with the existing
 *
 * If the property does not exist, save the property key to the property names storage and set the metadata
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const apply = (target, key, meta) => {
    mark(target, key);
    const old = get(target.constructor, keys_1.PROP, key);
    if (!old) {
        const _a = meta, { format } = _a, p = __rest(_a, ["format"]);
        const formats = format ? [format] : [];
        Reflect.defineMetadata(keys_1.PROP, Object.assign(Object.assign({}, p), { formats }), target.constructor, key);
        return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [newMeta, messages] = mergeMeta(old, meta);
    logMessage(messages, `${target.constructor.name}.${key}`);
    Reflect.defineMetadata(keys_1.PROP, newMeta, target.constructor, key);
};
/**
 * Save the property key to the property names storage if not exist
 */
const mark = (target, key) => {
    const propNames = get(target.constructor, keys_1.PROP_NAMES, keys_1.PROP_NAMES);
    if (!propNames) {
        Reflect.defineMetadata(keys_1.PROP_NAMES, [key], target.constructor, keys_1.PROP_NAMES);
        return;
    }
    if (propNames.includes(key))
        return;
    Reflect.defineMetadata(keys_1.PROP_NAMES, [...propNames, key], target.constructor, keys_1.PROP_NAMES);
};
/**
 * Get the metadata property from the target
 */
const get = (target, key, prop) => prop
    ? Reflect.getMetadata(key, target, prop)
    : Reflect.getMetadata(key, target);
/**
 * Get all meta target's properties
 */
const getAll = (target, key) => {
    const propNames = get(target, keys_1.PROP_NAMES, keys_1.PROP_NAMES);
    if (!propNames)
        return [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return propNames.map((p) => [p, get(target, key, p)]);
};
const compare = (newRecord, oldRecord, groupName) => {
    if (newRecord && oldRecord) {
        const messages = [];
        Object.keys(newRecord).forEach((k) => {
            if (k in oldRecord) {
                if (typeof newRecord[k] === 'object' &&
                    typeof oldRecord[k] === 'object') {
                    messages.push(...compare(newRecord[k], oldRecord[k], `${groupName}.${k}`));
                    return;
                }
                messages.push((target) => [
                    `Multiple ${groupName}/${k} applied on `,
                    target,
                    `, the old '`,
                    k,
                    oldRecord[k],
                    `' will be removed`,
                ]);
            }
        });
        return messages;
    }
    return [];
};
/**
 * Merge the metadata of the target with the given metadata
 */
const mergeMeta = (oldMeta, newMeta) => {
    var _a, _b;
    const messages = [];
    const { constraint: oldConstraint, typeDef: oldTypeDef, formats } = oldMeta, oldP = __rest(oldMeta, ["constraint", "typeDef", "formats"]);
    const { constraint: newConstraint, typeDef: newTypeDef, format } = newMeta, newP = __rest(newMeta, ["constraint", "typeDef", "format"]);
    messages.push(...compare(newConstraint, oldConstraint, 'constraint'));
    messages.push(...compare(newTypeDef, oldTypeDef, 'type definition'));
    const constraint = oldConstraint || newConstraint
        ? Object.assign(Object.assign(Object.assign({}, oldConstraint), newConstraint), { errorMessage: Object.assign(Object.assign({}, ((_a = oldConstraint === null || oldConstraint === void 0 ? void 0 : oldConstraint.errorMessage) !== null && _a !== void 0 ? _a : {})), ((_b = newConstraint === null || newConstraint === void 0 ? void 0 : newConstraint.errorMessage) !== null && _b !== void 0 ? _b : {})) }) : undefined;
    const typeDef = oldTypeDef || newTypeDef
        ? Object.assign(Object.assign({}, oldTypeDef), newTypeDef)
        : undefined;
    const newFormat = format ? [...formats, format] : formats;
    return [
        Object.assign(Object.assign(Object.assign({}, oldP), newP), { constraint,
            typeDef, formats: newFormat }),
        messages,
    ];
};
/**
 * Get target unique id or create a new one if not exist
 */
const getId = (target) => {
    const id = get(target, keys_1.VALIDATOR_ID, keys_1.VALIDATOR_ID);
    if (id)
        return id;
    const newId = (0, crypto_1.randomUUID)();
    _apply(target, keys_1.VALIDATOR_ID, newId);
    return newId;
};
exports.MetaStorage = {
    apply,
    get,
    getAll,
    mergeMeta,
    _apply,
    getId,
};
