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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AuthorService = class AuthorService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllAuthors(page = 1, limit = 10) {
        page = Number(page);
        limit = Number(limit);
        const offset = (page - 1) * limit;
        try {
            const authors = await this.prisma.author.findMany({
                skip: offset,
                take: limit,
            });
            const totalAuthors = await this.prisma.author.count();
            const totalPage = Math.ceil(totalAuthors / limit);
            const _links = {
                self: `/authors?page=${page}&limit=${limit}`,
                next: page < totalPage ? `/authors?page=${page + 1}&limit=${limit}` : null,
                prev: page > 1 ? `/authors?page=${page - 1}&limit=${limit}` : null,
            };
            return {
                _links,
                data: authors.map((author) => ({
                    id: author.id,
                    name: author.name,
                    image: author.image,
                })),
                pagination: {
                    totalPage,
                    totalAuthors,
                },
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async getSingleAuthor(authorId) {
        try {
            const author = await this.prisma.author.findUnique({
                where: { id: authorId },
            });
            if (!author) {
                throw new Error(`Author with ID ${authorId} not found`);
            }
            return {
                _links: {
                    self: `/authors/${authorId}`,
                },
                data: {
                    id: author.id,
                    name: author.name,
                    image: author.image,
                },
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async addAuthor(authorData) {
        try {
            const newAuthor = await this.prisma.author.create({
                data: { ...authorData },
            });
            return {
                _links: {
                    self: `/authors/${newAuthor.id}`,
                },
                data: newAuthor,
            };
        }
        catch (error) {
            throw new Error(error?.message);
        }
    }
    async updateAuthor(id, data) {
        try {
            const updatedAuthor = await this.prisma.author.update({
                where: { id },
                data,
            });
            return {
                _links: {
                    self: `/authors/${id}`,
                },
                data: updatedAuthor,
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Author with ID ${id} not found`);
            }
            throw new Error(error?.message);
        }
    }
    async deleteAuthor(authorId) {
        try {
            await this.prisma.blog.deleteMany({
                where: {
                    authorId: authorId,
                },
            });
            await this.prisma.author.delete({
                where: { id: authorId },
            });
            return {
                message: `Author with ID ${authorId} has been deleted`,
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Author with ID ${authorId} not found`);
            }
            throw new Error(error?.message);
        }
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthorService);
//# sourceMappingURL=author.service.js.map