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
exports.BlogsController = void 0;
const blogs_service_1 = require("./blogs.service");
const common_1 = require("@nestjs/common");
const createBlogs_dto_1 = require("./dto/createBlogs.dto");
const blog_enum_1 = require("../../common/enums/blog.enum");
const updateBlog_dto_1 = require("./dto/updateBlog.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const auth_guard_1 = require("../../common/guards/auth.guard");
const role_guard_1 = require("../../common/guards/role.guard");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async getBlogs(page = 1, limit = 10, sort = blog_enum_1.BlogSort.recent) {
        try {
            return await this.blogsService.getAllBlogs(page, limit, sort);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry! Something wrong in our server',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createBlog(createBlogDto) {
        try {
            const blog = await this.blogsService.createBlog(createBlogDto);
            return {
                data: blog,
                _links: {
                    self: `/blogs/${blog.id}`,
                    author: `authors/${blog.authorId}`,
                },
            };
        }
        catch (e) {
            throw new common_1.HttpException({
                devMessage: e.message,
                clientMessage: 'Sorry ! something went wrong in server',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBlogById(blogId) {
        try {
            if (blogId === ':blogId')
                throw new Error('No blog id found');
            return await this.blogsService.getBlogById(blogId);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry something wrong with getting the blog',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBlogById(blogId, updateData) {
        try {
            if (blogId === ':blogId')
                throw new Error('No blog id found');
            return await this.blogsService.updateBlogById(blogId, updateData);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Failed to update the blog',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteBlogById(blogId) {
        try {
            if (blogId === ':blogId')
                throw new Error('No blog id found');
            return await this.blogsService.deleteBlogById(blogId);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Failed to delete the blog',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAuthorBlogs(authorId, page = 1, limit = 10) {
        try {
            if (authorId === ':authorId')
                throw new Error('No author id found');
            return await this.blogsService.getAuthorBlogs(authorId, page, limit);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while getting the author’s blogs',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSearchedBlogs(page = 1, query = '', limit, sort = blog_enum_1.BlogSort.recent) {
        try {
            return await this.blogsService.searchBlogs(page, query, limit, sort);
        }
        catch (error) {
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry, something went wrong while getting the author’s blogs',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, roles_decorator_1.Roles)(['moderator']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBlogs_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(':blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogById", null);
__decorate([
    (0, roles_decorator_1.Roles)(['moderator']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Put)(':blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateBlog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlogById", null);
__decorate([
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Delete)(':blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlogById", null);
__decorate([
    (0, common_1.Get)('/author/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getAuthorBlogs", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('query')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getSearchedBlogs", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map