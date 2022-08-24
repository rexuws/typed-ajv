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
exports.Team = exports.User = exports.UserRoles = void 0;
const util_1 = require("util");
const __1 = require("../");
var UserRoles;
(function (UserRoles) {
    UserRoles["MEMBER"] = "MEMBER";
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["IT"] = "IT";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
class User {
}
__decorate([
    (0, __1.IsString)(),
    (0, __1.IsUUID)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, __1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, __1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, __1.IsString)(),
    (0, __1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, __1.IsEnum)([UserRoles.MEMBER, UserRoles.ADMIN, UserRoles.IT]),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    (0, __1.IsString)(),
    (0, __1.IsUUID)(),
    (0, __1.ValidateIf)((o) => {
        console.log('here');
        return o === UserRoles.MEMBER;
    }, { dependency: 'roles' }),
    __metadata("design:type", String)
], User.prototype, "managerId", void 0);
exports.User = User;
class Team {
}
__decorate([
    (0, __1.IsString)(),
    (0, __1.IsUUID)(),
    __metadata("design:type", Array)
], Team.prototype, "id", void 0);
__decorate([
    (0, __1.IsString)(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, __1.Type)(User),
    __metadata("design:type", Array)
], Team.prototype, "members", void 0);
exports.Team = Team;
const typedAjv = new __1.TypedAjvBuilder()
    .useOptions({
    compileAsync: true,
    validateNested: true,
})
    .usePlugin(__1.validateIfParserPlugin)
    .build();
typedAjv.compile(User).then((v) => {
    console.log((0, util_1.inspect)(v.validate.schema, false, null, true));
});
