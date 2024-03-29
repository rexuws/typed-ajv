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
exports.Result = exports.ValidatedResult = void 0;
const transformers_1 = require("../transformers");
const Type_1 = require("../transformers/Type");
const validators_1 = require("../validators");
class ValidatedResult {
}
__decorate([
    (0, validators_1.IsString)(),
    (0, transformers_1.Transform)((_, object) => object.instancePath),
    __metadata("design:type", String)
], ValidatedResult.prototype, "property", void 0);
__decorate([
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], ValidatedResult.prototype, "message", void 0);
exports.ValidatedResult = ValidatedResult;
class Result {
}
__decorate([
    (0, transformers_1.Transform)((value) => value !== null && value !== void 0 ? value : 'Validate failed'),
    (0, validators_1.IsString)(),
    __metadata("design:type", String)
], Result.prototype, "status", void 0);
__decorate([
    (0, Type_1.Type)(ValidatedResult),
    __metadata("design:type", Array)
], Result.prototype, "data", void 0);
exports.Result = Result;
