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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const getUserRole_1 = require("../lib/getUserRole");
const matchRoles_1 = require("../lib/matchRoles");
const isEmptyObj_1 = require("../lib/isEmptyObj");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        try {
            const roles = this.reflector.get(roles_decorator_1.Roles, context.getHandler());
            if (!roles || (0, isEmptyObj_1.default)(roles)) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            const userInfo = await (0, getUserRole_1.default)(token);
            if (userInfo['/roles'] && userInfo['/roles'].length > 0) {
                return (0, matchRoles_1.default)(roles, userInfo['/roles']);
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry! You are not allowed to perform this action.',
            }, 401);
            return false;
        }
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader)
            return null;
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token)
            return null;
        return token;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=role.guard.js.map