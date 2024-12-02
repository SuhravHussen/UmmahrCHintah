import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // Assuming you're using Prisma for DB interactions
import {
  GetAllAuthorsResponse,
  GetSingleAuthorResponse,
} from '../../common/interfaces/author.interface';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@Injectable()
export class AuthorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllAuthors(
    page: number = 1,
    limit: number = 10,
  ): Promise<GetAllAuthorsResponse> {
    page = Number(page);
    limit = Number(limit);
    const offset = (page - 1) * limit;

    try {
      // Fetch authors with pagination
      const authors = await this.prisma.author.findMany({
        skip: offset,
        take: limit,
        orderBy: { name: 'asc' },
      });

      // Count total authors for pagination
      const totalAuthors = await this.prisma.author.count();
      const totalPage = Math.ceil(totalAuthors / limit);

      // Create pagination links
      const _links = {
        self: `/authors?page=${page}&limit=${limit}`,
        next:
          page < totalPage ? `/authors?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/authors?page=${page - 1}&limit=${limit}` : null,
      };

      // Return the response with data and pagination
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
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  //   Get a single author by ID
  async getSingleAuthor(authorId: string): Promise<GetSingleAuthorResponse> {
    try {
      const author = await this.prisma.author.findUnique({
        where: { id: authorId },
      });

      if (!author) {
        throw new Error(`Author with ID ${authorId} not found`);
      }

      // Return the response for single author
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
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  // Add a new author
  async addAuthor(
    authorData: CreateAuthorDto,
  ): Promise<GetSingleAuthorResponse> {
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
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  // Update an existing author
  async updateAuthor(id: string, data: UpdateAuthorDto): Promise<any> {
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw new Error(error?.message);
    }
  }

  // Delete an author
  async deleteAuthor(authorId: string): Promise<{ message: string }> {
    try {
      // First, delete the blogs linked to the author
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      throw new Error(error?.message);
    }
  }
}
