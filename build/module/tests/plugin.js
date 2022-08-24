var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inspect } from 'util';
import { IsEmail, IsEnum, IsString, IsUUID, Type, TypedAjvBuilder, ValidateIf, validateIfParserPlugin, } from '../';
export var UserRoles;
(function (UserRoles) {
    UserRoles["MEMBER"] = "MEMBER";
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["IT"] = "IT";
})(UserRoles || (UserRoles = {}));
export class User {
    id;
    username;
    password;
    email;
    roles;
    managerId;
}
__decorate([
    IsString(),
    IsUUID(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    IsString(),
    IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    IsEnum([UserRoles.MEMBER, UserRoles.ADMIN, UserRoles.IT]),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    IsString(),
    IsUUID(),
    ValidateIf((o) => {
        console.log('here');
        return o === UserRoles.MEMBER;
    }, { dependency: 'roles' }),
    __metadata("design:type", String)
], User.prototype, "managerId", void 0);
export class Team {
    id;
    name;
    members;
}
__decorate([
    IsString(),
    IsUUID(),
    __metadata("design:type", Array)
], Team.prototype, "id", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    Type(User),
    __metadata("design:type", Array)
], Team.prototype, "members", void 0);
const typedAjv = new TypedAjvBuilder()
    .useOptions({
    compileAsync: true,
    validateNested: true,
})
    .usePlugin(validateIfParserPlugin)
    .build();
typedAjv.compile(User).then((v) => {
    console.log(inspect(v.validate.schema, false, null, true));
});
