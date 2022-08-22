var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform } from '../transformers';
import { Type } from '../transformers/Type';
import { IsString } from '../validators';
export class ValidatedResult {
    property;
    message;
}
__decorate([
    IsString(),
    Transform((_, object) => object.instancePath),
    __metadata("design:type", String)
], ValidatedResult.prototype, "property", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ValidatedResult.prototype, "message", void 0);
export class Result {
    status;
    data;
}
__decorate([
    Transform((value) => value ?? 'Validate failed'),
    IsString(),
    __metadata("design:type", String)
], Result.prototype, "status", void 0);
__decorate([
    Type(ValidatedResult),
    __metadata("design:type", Array)
], Result.prototype, "data", void 0);
