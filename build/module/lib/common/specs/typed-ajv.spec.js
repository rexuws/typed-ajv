var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import test from 'ava';
import { Type } from '../../transformers/Type';
import { IsString } from '../../validators';
import { commonParser } from '../parsers';
import { TypedAjvStorage } from '../typed-ajv';
let typedAjv;
class A {
    a;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], A.prototype, "a", void 0);
class B {
    b;
    nested;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], B.prototype, "b", void 0);
__decorate([
    Type(A),
    __metadata("design:type", A)
], B.prototype, "nested", void 0);
class C {
    c;
    nested;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], C.prototype, "c", void 0);
__decorate([
    Type(A),
    __metadata("design:type", Array)
], C.prototype, "nested", void 0);
test.beforeEach(() => {
    typedAjv = new TypedAjvStorage(commonParser, {
        compileAsync: true,
        validateNested: true,
    });
});
test('typedAjv.compile should return compiled functions', async (t) => {
    const compiled = await typedAjv.compile(A);
    t.is(typeof compiled, 'object');
    t.is(typeof compiled.serialize, 'function');
    t.is(typeof compiled.parse, 'function');
    t.is(typeof compiled.validate, 'function');
});
test('typedAjv.get should return compiled functions', async (t) => {
    await typedAjv.compile(A);
    const compiled = typedAjv.get(A);
    t.is(typeof compiled, 'object');
    t.is(typeof compiled.serialize, 'function');
    t.is(typeof compiled.parse, 'function');
    t.is(typeof compiled.validate, 'function');
});
test('typedAjv.get should throw error if target is not compiled', (t) => {
    t.throws(() => {
        typedAjv.get(A);
    }, { instanceOf: Error });
});
test('should validate dummy class A', async (t) => {
    const compiledA = await typedAjv.compile(A);
    t.is(compiledA.validate({ a: 'hello world' }), true);
});
test('should validate dummy class B with nested object field', async (t) => {
    const compiledB = await typedAjv.compile(B);
    t.is(compiledB.validate({ b: 'hello world', nested: { a: 'hi' } }), true);
});
test('should validate dummy class C with nested array field', async (t) => {
    const compiledC = await typedAjv.compile(C);
    t.is(compiledC.validate({ c: 'hello world', nested: [{ a: 'test' }] }), true);
});
