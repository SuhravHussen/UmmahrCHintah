import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogDto } from './dto/createBlogs.dto';
import {
  Blog,
  GetAllBlogsResponse,
} from '../../common/interfaces/blog.interface';
import calculateReadingTime from '../../common/lib/calculateReadingTime';
import { BlogSort } from '../../common/enums/blog.enum';

@Injectable()
export class BlogsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    try {
      const newAuthor = await this.prisma.author.create({
        data: {
          name: 'John Doe',
          image: 'https://example.com/john.jpg',
        },
      });

      return await this.prisma.blog.create({
        data: {
          ...blogData,
          content: blogData.content,
          totalViews: 0,
          readingTime: calculateReadingTime(blogData.content.text),
          authorId: newAuthor.id,
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
      const links = {
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
        links,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
