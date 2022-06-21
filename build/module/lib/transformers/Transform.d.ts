interface ITransform {
    fn(value: unknown, object: unknown, context?: unknown): unknown;
}
export declare function Transform<F extends ITransform['fn']>(transform: F): <TKey extends string, O extends {
    [k in TKey]: ReturnType<F>;
}>(target: O, key: TKey) => void;
export {};
