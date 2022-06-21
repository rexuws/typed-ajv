import { randomUUID } from 'crypto';
import { PROP, PROP_NAMES, VALIDATOR_ID } from './keys';
import { Logger } from './log';
const logMessage = (message, target) => {
    message.forEach((m) => Logger(...m(target)));
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
    const old = get(target.constructor, PROP, key);
    if (!old) {
        const { format, ...p } = meta;
        const formats = format ? [format] : [];
        Reflect.defineMetadata(PROP, {
            ...p,
            formats,
        }, target.constructor, key);
        return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [newMeta, messages] = mergeMeta(old, meta);
    logMessage(messages, `${target.constructor.name}.${key}`);
    Reflect.defineMetadata(PROP, newMeta, target.constructor, key);
};
/**
 * Save the property key to the property names storage if not exist
 */
const mark = (target, key) => {
    const propNames = get(target.constructor, PROP_NAMES, PROP_NAMES);
    if (!propNames) {
        Reflect.defineMetadata(PROP_NAMES, [key], target.constructor, PROP_NAMES);
        return;
    }
    if (propNames.includes(key))
        return;
    Reflect.defineMetadata(PROP_NAMES, [...propNames, key], target.constructor, PROP_NAMES);
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
    const propNames = get(target, PROP_NAMES, PROP_NAMES);
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
    const messages = [];
    const { constraint: oldConstraint, typeDef: oldTypeDef, formats, ...oldP } = oldMeta;
    const { constraint: newConstraint, typeDef: newTypeDef, format, ...newP } = newMeta;
    messages.push(...compare(newConstraint, oldConstraint, 'constraint'));
    messages.push(...compare(newTypeDef, oldTypeDef, 'type definition'));
    const constraint = oldConstraint || newConstraint
        ? {
            ...oldConstraint,
            ...newConstraint,
            errorMessage: {
                ...(oldConstraint?.errorMessage ?? {}),
                ...(newConstraint?.errorMessage ?? {}),
            },
        }
        : undefined;
    const typeDef = oldTypeDef || newTypeDef
        ? { ...oldTypeDef, ...newTypeDef }
        : undefined;
    const newFormat = format ? [...formats, format] : formats;
    return [
        {
            ...oldP,
            ...newP,
            constraint,
            typeDef,
            formats: newFormat,
        },
        messages,
    ];
};
/**
 * Get target unique id or create a new one if not exist
 */
const getId = (target) => {
    const id = get(target, VALIDATOR_ID, VALIDATOR_ID);
    if (id)
        return id;
    const newId = randomUUID();
    _apply(target, VALIDATOR_ID, newId);
    return newId;
};
export const MetaStorage = {
    apply,
    get,
    getAll,
    mergeMeta,
    _apply,
    getId,
};
