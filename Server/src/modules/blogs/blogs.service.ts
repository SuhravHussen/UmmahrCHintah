import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogDto } from './dto/createBlogs.dto';
import {
  Blog,
  GetAllBlogsResponse,
  GetSingleBlogResponse,
} from '../../common/interfaces/blog.interface';
import calculateReadingTime from '../../common/lib/calculateReadingTime';
import { BlogSort } from '../../common/enums/blog.enum';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Injectable()
export class BlogsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    try {
      return await this.prisma.blog.create({
        data: {
          ...blogData,
          totalViews: 0,
          readingTime: calculateReadingTime(blogData.content.text),
        },
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  // Service to get all blogs with pagination, sorting, and links
  async getAllBlogs(
    page: number,
    limit: number,
    sort: BlogSort,
  ): Promise<GetAllBlogsResponse> {
    page = Number(page);
    limit = Number(limit);
    try {
      // Calculate the offset based on page and limit
      const offset = (page - 1) * limit;

      // Determine the orderBy clause based on the sorting parameter
      let orderBy: any;
      switch (sort) {
        case BlogSort.recent:
          orderBy = { dateWritten: 'desc' }; // Most recent blogs
          break;
        case BlogSort.oldest:
          orderBy = { dateWritten: 'asc' }; // Oldest blogs
          break;
        case BlogSort.views:
          orderBy = { totalViews: 'desc' }; // Blogs with most views
          break;
        default:
          orderBy = { dateWritten: 'desc' }; // Default to most recent if no valid sort is provided
          break;
      }

      // Fetch blogs with pagination, sorting, and reading time calculation
      const blogs = await this.prisma.blog.findMany({
        skip: offset,
        take: limit,
        orderBy, // Apply dynamic sorting based on the enum
        include: {
          author: true, // Include the author's details in each blog
        },
      });

      // Get total blog count for pagination
      const totalBlogs = await this.prisma.blog.count();

      // Calculate total pages
      const totalPage = Math.ceil(totalBlogs / limit);

      // Build pagination links
      const _links = {
        self: `/blogs?page=${page}&limit=${limit}&sort=${sort}`,
        next:
          page < totalPage
            ? `/blogs?page=${page + 1}&limit=${limit}&sort=${sort}`
            : null,
        prev:
          page > 1
            ? `/blogs?page=${page - 1}&limit=${limit}&sort=${sort}`
            : null,
      };

      // Return the paginated blogs, pagination info, and links
      return {
        data: blogs,
        pagination: {
          totalPage,
          totalBlogs,
        },
        _links,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async getBlogById(id: string): Promise<GetSingleBlogResponse> {
    try {
      // Fetch the blog by its ID, including the author
      const blog = await this.prisma.blog.findUnique({
        where: { id }, // Fetch based on the ID
        include: {
          author: true, // Include author details
        },
      });

      // If the blog is not found, return null
      if (!blog) {
        return {
          _links: {
            self: '',
            author: '',
          },
          data: {} as Blog,
        };
      }

      // Return the blog data in the specified format
      return {
        _links: {
          self: `/blogs/${blog.id}`, // Blog link
          author: `/authors/${blog.authorId}`, // Author link
        },
        data: blog,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async updateBlogById(
    id: string,
    data: UpdateBlogDto,
  ): Promise<GetSingleBlogResponse> {
    try {
      if (data.hasOwnProperty('id')) {
        throw new Error('Changing the blog ID is not allowed.');
      }

      const updatedBlog = await this.prisma.blog.update({
        where: { id },
        data, // Update fields based on the provided data
      });
      return {
        data: updatedBlog,
        _links: {
          self: `/blogs/${updatedBlog.id}`,
        },
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  // Delete blog by ID
  async deleteBlogById(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.blog.delete({
        where: { id },
      });
      return {
        message: 'Blog deleted successfully',
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async getAuthorBlogs(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<GetAllBlogsResponse> {
    page = Number(page);
    limit = Number(limit);
    try {
      const offset = (page - 1) * limit;

      // Fetch blogs by authorId with pagination and sorting
      const blogs = await this.prisma.blog.findMany({
        skip: offset,
        take: limit,
        where: { authorId }, // Filter by authorId
        include: { author: true }, // Include author details
      });

      // Get total blog count for this author
      const totalBlogs = await this.prisma.blog.count({
        where: { authorId },
      });

      const totalPage = Math.ceil(totalBlogs / limit);

      const _links = {
        self: `/authors/${authorId}/blogs?page=${page}&limit=${limit}`,
        next:
          page < totalPage
            ? `/authors/${authorId}/blogs?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page > 1
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
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async searchBlogs(
    page: number,
    query: string,
    limit: number = 10,
    sort: BlogSort,
  ): Promise<GetAllBlogsResponse> {
    page = Number(page);
    limit = Number(limit);
    try {
      const offset = (page - 1) * limit;

      let orderBy: any;
      switch (sort) {
        case BlogSort.recent:
          orderBy = { dateWritten: 'desc' }; // Most recent blogs
          break;
        case BlogSort.oldest:
          orderBy = { dateWritten: 'asc' }; // Oldest blogs
          break;
        case BlogSort.views:
          orderBy = { totalViews: 'desc' }; // Blogs with most views
          break;
        default:
          orderBy = { dateWritten: 'desc' }; // Default to most recent if no valid sort is provided
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

      // Calculate total pages
      const totalPage = Math.ceil(totalBlogs / limit);

      // Build pagination links
      const _links = {
        self: query
          ? `/blogs/search?query=${query}&page=${page}&limit=${limit}`
          : `/blogs/search?page=${page}&limit=${limit}`,
        next:
          page < totalPage
            ? query
              ? `/blogs/search?query=${query}&page=${page + 1}&limit=${limit}`
              : `/blogs/search?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page > 1
            ? query
              ? `/blogs/search?query=${query}&page=${page - 1}&limit=${limit}`
              : `/blogs/search?page=${page - 1}&limit=${limit}`
            : null,
      };

      // Return the paginated search results, pagination info, and links
      return {
        data: blogs,
        pagination: {
          totalPage,
          totalBlogs,
        },
        _links,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
