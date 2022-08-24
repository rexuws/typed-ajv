var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import test from 'ava';
import { commonParser } from '../../common/parsers';
import { TypedAjvStorage } from '../../common/typed-ajv';
import { IsString } from './IsString';
class User {
    username;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
class Strings {
    strs;
}
__decorate([
    IsString(),
    __metadata("design:type", Array)
], Strings.prototype, "strs", void 0);
class StringCustomMessage {
    str;
}
__decorate([
    IsString({ errorMessage: 'custom message' }),
    __metadata("design:type", String)
], StringCustomMessage.prototype, "str", void 0);
let typedAjv;
// test.before.
test.beforeEach(() => {
    typedAjv = new TypedAjvStorage(commonParser, {
        compileAsync: true,
        validateNested: true,
    });
});
test('should validate string property', async (t) => {
    await typedAjv.compile(User);
    t.notThrows(() => {
        const compiled = typedAjv.get(User);
        const validUser = {
            username: 'test',
        };
        t.is(compiled.validate(validUser), true);
    });
});
test('should validate string[] property', async (t) => {
    await typedAjv.compile(Strings);
    t.notThrows(() => {
        const compiled = typedAjv.get(Strings);
        const validStrings = {
            strs: ['test', 'test2'],
        };
        t.is(compiled.validate(validStrings), true);
    });
});
test('should invalidate non string property', async (t) => {
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
test('should invalidate non string property and print custom message', async (t) => {
    await typedAjv.compile(StringCustomMessage);
    const compiled = typedAjv.get(StringCustomMessage);
    const invalid = {
        str: 123,
    };
    const expectError = [
        {
            instancePath: '/str',
            schemaPath: '#/properties/str/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'custom message',
        },
    ];
    t.is(compiled.validate(invalid), false);
    t.deepEqual(compiled.validate.errors, expectError);
});
