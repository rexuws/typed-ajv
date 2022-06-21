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
const ava_1 = __importDefault(require("ava"));
const parsers_1 = require("../../common/parsers");
const typed_ajv_1 = require("../../common/typed-ajv");
const IsString_1 = require("./IsString");
class User {
}
__decorate([
    (0, IsString_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
class Strings {
}
__decorate([
    (0, IsString_1.IsString)(),
    __metadata("design:type", Array)
], Strings.prototype, "strs", void 0);
let typedAjv;
// test.before.
ava_1.default.beforeEach('should validate string property', async () => {
    typedAjv = new typed_ajv_1.TypedAjvStorage(parsers_1.commonParser, {
        compileAsync: true,
        validateNested: true,
    });
});
(0, ava_1.default)('should validate string property', (t) => {
    t.notThrows(() => {
        const compiled = typedAjv.get(User);
        const validUser = {
            username: 'test',
        };
        t.is(compiled.validate(validUser), true);
    });
});
(0, ava_1.default)('should validate string[] property', async (t) => {
    await typedAjv.compile(Strings);
    t.notThrows(() => {
        const compiled = typedAjv.get(Strings);
        const validStrings = {
            strs: ['test', 'test2'],
        };
        console.log('log', compiled.validate.toString());
        t.is(compiled.validate(validStrings), true);
    });
});
(0, ava_1.default)('should invalidate non string property', async (t) => {
    await typedAjv.compile(User);
    const compiled = typedAjv.get(User);
    const invalidUser = {
        username: 123,
    };
    const expectError = [
        {
            instancePath: '/username',
            schemaPath: '#/properties/username/type',
            keyword: 'type',
            params: { type: 'string' },
            message: "'username' must be a string",
        },
    ];
    t.is(compiled.validate(invalidUser), false);
    t.deepEqual(compiled.validate.errors, expectError);
});
