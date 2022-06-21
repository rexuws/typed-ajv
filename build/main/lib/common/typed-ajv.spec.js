"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ava_1 = __importDefault(require("ava"));
const Type_1 = require("../transformers/Type");
const validators_1 = require("../validators");
const parsers_1 = require("./parsers");
const typed_ajv_1 = require("./typed-ajv");
let typedAjv;
class A {
}
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], A.prototype, "a", void 0);
class B {
}
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], B.prototype, "b", void 0);
__decorate([
    (0, Type_1.Type)(A),
    __metadata("design:type", A)
], B.prototype, "nested", void 0);
class C {
}
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], C.prototype, "c", void 0);
__decorate([
    (0, Type_1.Type)(A),
    __metadata("design:type", Array)
], C.prototype, "nested", void 0);
ava_1.default.beforeEach(() => {
    typedAjv = new typed_ajv_1.TypedAjvStorage(parsers_1.commonParser, {
        compileAsync: true,
        validateNested: true,
    });
});
(0, ava_1.default)('typedAjv.compile should return compiled functions', async (t) => {
    const compiled = await typedAjv.compile(A);
    t.is(typeof compiled, 'object');
    t.is(typeof compiled.serialize, 'function');
    t.is(typeof compiled.parse, 'function');
    t.is(typeof compiled.validate, 'function');
});
(0, ava_1.default)('typedAjv.get should return compiled functions', async (t) => {
    await typedAjv.compile(A);
    const compiled = typedAjv.get(A);
    t.is(typeof compiled, 'object');
    t.is(typeof compiled.serialize, 'function');
    t.is(typeof compiled.parse, 'function');
    t.is(typeof compiled.validate, 'function');
});
(0, ava_1.default)('typedAjv.get should throw error if target is not compiled', (t) => {
    t.throws(() => {
        typedAjv.get(A);
    }, { instanceOf: Error });
});
(0, ava_1.default)('should validate dummy class A', async (t) => {
    const compiledA = await typedAjv.compile(A);
    t.is(compiledA.validate({ a: 'hello world' }), true);
});
(0, ava_1.default)('should validate dummy class B with nested object field', async (t) => {
    const compiledB = await typedAjv.compile(B);
    t.is(compiledB.validate({ b: 'hello world', nested: { a: 'hi' } }), true);
});
(0, ava_1.default)('should validate dummy class C with nested array field', async (t) => {
    const compiledC = await typedAjv.compile(C);
    t.is(compiledC.validate({ c: 'hello world', nested: [{ a: 'test' }] }), true);
});
