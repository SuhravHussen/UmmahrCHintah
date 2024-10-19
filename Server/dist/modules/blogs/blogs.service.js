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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const calculateReadingTime_1 = require("../../common/lib/calculateReadingTime");
const blog_enum_1 = require("../../common/enums/blog.enum");
let BlogsService = class BlogsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createBlog(blogData) {
        try {
            return await this.prisma.blog.create({
                data: {
                    ...blogData,
                    totalViews: 0,
                    readingTime: (0, calculateReadingTime_1.default)(blogData.content.text),
                },
            });
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async getAllBlogs(page, limit, sort) {
        page = Number(page);
        limit = Number(limit);
        try {
            const offset = (page - 1) * limit;
            let orderBy;
            switch (sort) {
                case blog_enum_1.BlogSort.recent:
                    orderBy = { dateWritten: 'desc' };
                    break;
                case blog_enum_1.BlogSort.oldest:
                    orderBy = { dateWritten: 'asc' };
                    break;
                case blog_enum_1.BlogSort.views:
                    orderBy = { totalViews: 'desc' };
                    break;
                default:
                    orderBy = { dateWritten: 'desc' };
                    break;
            }
            const blogs = await this.prisma.blog.findMany({
                skip: offset,
                take: limit,
                orderBy,
                include: {
                    author: true,
                },
            });
            const totalBlogs = await this.prisma.blog.count();
            const totalPage = Math.ceil(totalBlogs / limit);
            const _links = {
                self: `/blogs?page=${page}&limit=${limit}&sort=${sort}`,
                next: page < totalPage
                    ? `/blogs?page=${page + 1}&limit=${limit}&sort=${sort}`
                    : null,
                prev: page > 1
                    ? `/blogs?page=${page - 1}&limit=${limit}&sort=${sort}`
                    : null,
            };
            return {
                data: blogs,
                pagination: {
                    totalPage,
                    totalBlogs,
                },
                _links,
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async getBlogById(id) {
        try {
            const blog = await this.prisma.blog.findUnique({
                where: { id },
                include: {
                    author: true,
                },
            });
            if (!blog) {
                return {
                    _links: {
                        self: '',
                        author: '',
                    },
                    data: {},
                };
            }
            return {
                _links: {
                    self: `/blogs/${blog.id}`,
                    author: `/authors/${blog.authorId}`,
                },
                data: blog,
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async updateBlogById(id, data) {
        try {
            if (data.hasOwnProperty('id')) {
                throw new Error('Changing the blog ID is not allowed.');
            }
            const updatedBlog = await this.prisma.blog.update({
                where: { id },
                data,
            });
            return {
                data: updatedBlog,
                _links: {
                    self: `/blogs/${updatedBlog.id}`,
                },
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async deleteBlogById(id) {
        try {
            await this.prisma.blog.delete({
                where: { id },
            });
            return {
                message: 'Blog deleted successfully',
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async getAuthorBlogs(authorId, page, limit) {
        page = Number(page);
        limit = Number(limit);
        try {
            const offset = (page - 1) * limit;
            const blogs = await this.prisma.blog.findMany({
                skip: offset,
                take: limit,
                where: { authorId },
                include: { author: true },
            });
            const totalBlogs = await this.prisma.blog.count({
                where: { authorId },
            });
            const totalPage = Math.ceil(totalBlogs / limit);
            const _links = {
                self: `/authors/${authorId}/blogs?page=${page}&limit=${limit}`,
                next: page < totalPage
                    ? `/authors/${authorId}/blogs?page=${page + 1}&limit=${limit}`
                    : null,
                prev: page > 1
                    ? `/authors/${authorId}/blogs?page=${page - 1}&limit=${limit}`
                    : null,
            };
            return {
                data: blogs,
                pagination: {
                    totalPage,
                    totalBlogs,
                },
                _links,
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async searchBlogs(page, query, limit = 10, sort) {
        page = Number(page);
        limit = Number(limit);
        try {
            const offset = (page - 1) * limit;
            let orderBy;
            switch (sort) {
                case blog_enum_1.BlogSort.recent:
                    orderBy = { dateWritten: 'desc' };
                    break;
                case blog_enum_1.BlogSort.oldest:
                    orderBy = { dateWritten: 'asc' };
                    break;
                case blog_enum_1.BlogSort.views:
                    orderBy = { totalViews: 'desc' };
                    break;
                default:
                    orderBy = { dateWritten: 'desc' };
                    break;
            }
            const blogs = await this.prisma.blog.findMany({
                skip: offset,
                take: limit,
                where: {
                    OR: [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            content: {
                                path: ['text'],
                                string_contains: query,
                            },
                        },
                        {
                            keywords: {
                                has: query,
                            },
                        },
                    ],
                },
                orderBy,
                include: {
                    author: true,
                },
            });
            const totalBlogs = await this.prisma.blog.count({
                where: {
                    OR: [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            content: {
                                path: ['text'],
                                string_contains: query,
                            },
                        },
                        {
                            keywords: {
                                has: query,
                            },
                        },
                    ],
                },
            });
            const totalPage = Math.ceil(totalBlogs / limit);
            const _links = {
                self: query
                    ? `/blogs/search?query=${query}&page=${page}&limit=${limit}`
                    : `/blogs/search?page=${page}&limit=${limit}`,
                next: page < totalPage
                    ? query
                        ? `/blogs/search?query=${query}&page=${page + 1}&limit=${limit}`
                        : `/blogs/search?page=${page + 1}&limit=${limit}`
                    : null,
                prev: page > 1
                    ? query
                        ? `/blogs/search?query=${query}&page=${page - 1}&limit=${limit}`
                        : `/blogs/search?page=${page - 1}&limit=${limit}`
                    : null,
            };
            return {
                data: blogs,
                pagination: {
                    totalPage,
                    totalBlogs,
                },
                _links,
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map