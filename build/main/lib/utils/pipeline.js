"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeline = void 0;
/**
 * Pipe functions of the same type signature together
 *
 * @param pick - Receive the result of the previous function as the first argument, the second is an array of the original arguments passed into the piped function. Return a new
 * array of arguments to be passed into the next function.
 */
const pipeline = (...args) => {
    const [pick, ...fns] = args;
    if (fns.length === 0)
        throw new TypeError('pipeline requires at least one function');
    if (fns.length === 1) {
        const handler = (...args) => fns[0](...args);
        handler.extends = (newPick, ...newFns) => (0, exports.pipeline)(newPick, ...fns, ...newFns);
        return handler;
    }
    const [fn, ...rest] = fns;
    const handler = (...args) => rest.reduce((acc, fn) => fn(...pick(acc, args)), fn(...args));
    handler.extends = (newPick, ...newFns) => (0, exports.pipeline)(newPick, ...fns, ...newFns);
    return handler;
};
exports.pipeline = pipeline;
