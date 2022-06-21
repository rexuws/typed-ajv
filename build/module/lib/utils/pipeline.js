/**
 * Pipe functions of the same type signature together
 *
 * @param pick - Receive the result of the previous function as the first argument, the second is an array of the original arguments passed into the piped function. Return a new
 * array of arguments to be passed into the next function.
 */
export const pipeline = (...args) => {
    const [pick, ...fns] = args;
    if (fns.length === 0)
        throw new TypeError('pipeline requires at least one function');
    if (fns.length === 1) {
        const handler = (...args) => fns[0](...args);
        handler.extends = (newPick, ...newFns) => pipeline(newPick, ...fns, ...newFns);
        return handler;
    }
    const [fn, ...rest] = fns;
    const handler = (...args) => rest.reduce((acc, fn) => fn(...pick(acc, args)), fn(...args));
    handler.extends = (newPick, ...newFns) => pipeline(newPick, ...fns, ...newFns);
    return handler;
};
const xxx = (a, b, c) => a + b + c;
const p = pipeline((_, args) => args, xxx);
p(1, 2, 3);
const a = p
    .extends((a, args) => [a, args[1], args[2]], (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c, (a, b, c) => a * b * c)
    .extends((_, args) => args, (a, b, c) => a * b * c);
const b = a.extends((res, args) => args, (a, b, c) => a * b * c);
// b()
// a.
// p.extends()
// type Params = Parameters<typeof xxx>;
// p.extends()
