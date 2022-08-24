import 'reflect-metadata';
declare class Nested {
    n: string[];
}
export declare class Base {
    id: string;
    nested: Nested[];
}
export declare class C1 extends Base {
    id: string;
}
export {};
