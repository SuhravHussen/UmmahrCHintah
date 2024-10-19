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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const author_service_1 = require("./author.service");
const common_1 = require("@nestjs/common");
const createAuthor_dto_1 = require("./dto/createAuthor.dto");
const updateAuthor_dto_1 = require("./dto/updateAuthor.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const auth_guard_1 = require("../../common/guards/auth.guard");
const role_guard_1 = require("../../common/guards/role.guard");
let AuthorController = class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }
    async getAllAuthors(page = 1, limit = 10) {
        try {
            return await this.authorService.getAllAuthors(page, limit);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while fetching the authors',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAuthorById(authorId) {
        try {
            if (authorId === ':authorId')
                throw new Error('No authorid found');
            return await this.authorService.getSingleAuthor(authorId);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while fetching the author',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addAuthor(createAuthorDto) {
        try {
            return await this.authorService.addAuthor(createAuthorDto);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while adding the author',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAuthor(authorId, updateAuthorDto) {
        try {
            if (authorId === ':authorId')
                throw new Error('No authorid found');
            const updatedAuthor = await this.authorService.updateAuthor(authorId, updateAuthorDto);
            return updatedAuthor;
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while updating the author',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAuthor(authorId) {
        try {
            if (authorId === ':authorId')
                throw new Error('No authorid found');
            return await this.authorService.deleteAuthor(authorId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    devMessage: error.message,
                    clientMessage: `Author with ID ${authorId} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while deleting the author',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthorController = AuthorController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "getAllAuthors", null);
__decorate([
    (0, common_1.Get)(':authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "getAuthorById", null);
__decorate([
    (0, roles_decorator_1.Roles)(['moderator']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAuthor_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "addAuthor", null);
__decorate([
    (0, roles_decorator_1.Roles)(['moderator']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Put)(':authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateAuthor_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "updateAuthor", null);
__decorate([
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Delete)(':authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "deleteAuthor", null);
exports.AuthorController = AuthorController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
//# sourceMappingURL=author.controller.js.map