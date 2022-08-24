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
import { inspect } from 'util';
import { MetaStorage } from '../lib/common/MetaStorage';
import { PROP } from '../lib/common/keys';
import { Type } from '../lib/transformers';
import { IsMongoId, IsString } from '../lib/validators';
class Nested {
    n;
}
__decorate([
    IsString(),
    __metadata("design:type", Array)
], Nested.prototype, "n", void 0);
export class Base {
    id;
    nested;
}
__decorate([
    IsString(),
    IsMongoId(),
    __metadata("design:type", String)
], Base.prototype, "id", void 0);
__decorate([
    Type(Nested, { validateNested: true }),
    __metadata("design:type", Array)
], Base.prototype, "nested", void 0);
export class C1 extends Base {
    id;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], C1.prototype, "id", void 0);
console.log(inspect(MetaStorage.getAll(C1, PROP), false, null, true));
