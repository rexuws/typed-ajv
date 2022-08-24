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
Object.defineProperty(exports, "__esModule", { value: true });
exports.C1 = exports.Base = void 0;
require("reflect-metadata");
const util_1 = require("util");
const MetaStorage_1 = require("../lib/common/MetaStorage");
const keys_1 = require("../lib/common/keys");
const transformers_1 = require("../lib/transformers");
const validators_1 = require("../lib/validators");
class Nested {
}
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", Array)
], Nested.prototype, "n", void 0);
class Base {
}
__decorate([
    (0, validators_1.IsString)(),
    (0, validators_1.IsMongoId)(),
    __metadata("design:type", String)
], Base.prototype, "id", void 0);
__decorate([
    (0, transformers_1.Type)(Nested, { validateNested: true }),
    __metadata("design:type", Array)
], Base.prototype, "nested", void 0);
exports.Base = Base;
class C1 extends Base {
}
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], C1.prototype, "id", void 0);
exports.C1 = C1;
console.log((0, util_1.inspect)(MetaStorage_1.MetaStorage.getAll(C1, keys_1.PROP), false, null, true));
