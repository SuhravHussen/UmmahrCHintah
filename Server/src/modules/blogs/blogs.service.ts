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
  constructor(private prisma: PrismaClient) {}

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

  // Method to create a list of blogs
  // async createBlogs(): Promise<Blog[]> {
  //   const createdBlogs: Blog[] = [];

  //   try {
  //     const response = await axios.get(
  //       'https://ummahrchintah.onrender.com/v1/blogs?page=1&limit=150&sort=recent',
  //     );

  //     const blogs = response.data.data.map((d) => ({
  //       title: d.title,
  //       content: d.content,
  //       dateWritten: d.dateWritten,
  //       readingTime: d.readingTime,
  //       keywords: d.keywords,
  //       originalPostLink: d.originalPostLink,
  //       authorId: d.authorId,
  //       totalViews: d.totalViews,
  //     }));
  //     // Loop through each blog and create it in the database
  //     for (const blog of blogs) {
  //       const createdBlog = await this.prisma.blog.create({
  //         data: {
  //           ...blog, // Spread the entire blog object directly
  //         },
  //       });
  //       createdBlogs.push(createdBlog);
  //     }

  //     console.log('Created blogs:', createdBlogs);
  //   } catch (error) {
  //     // Handle the error for each blog as needed
  //     console.error(`Failed to create blog: ${error?.message}`);
  //   }
  //   return createdBlogs;
  // }

  // async createAuhors() {
  //   try {
  //     const response = await axios.get(
  //       'https://ummahrchintah.onrender.com/v1/authors?page=1&limit=15',
  //     );

  //     const auhtors = response.data.data;
  //     console.log(auhtors);
  //     // Loop through each blog and create it in the database
  //     for (const blog of auhtors) {
  //       const createdBlog = await this.prisma.author.create({
  //         data: {
  //           ...blog, // Spread the entire blog object directly
  //         },
  //       });
  //       console.log(createdBlog);
  //     }
  //   } catch (error) {
  //     // Handle the error for each blog as needed
  //     console.error(`Failed to create blog: ${error?.message}`);
  //   }
  // }

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

  async updateTotalViews(id: string): Promise<GetSingleBlogResponse> {
    try {
      const updatedBlog = await this.prisma.blog.update({
        where: { id },
        data: {
          totalViews: {
            increment: 1,
          },
        },
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
        orderBy: { dateWritten: 'desc' },
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

  async getRelatedBlogs(blogId) {
    // Get the current blog to retrieve its keywords
    const currentBlog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!currentBlog) {
      throw new Error('Blog not found');
    }

    const keywords = currentBlog.keywords;

    const relatedBlogsByKeywords = await this.prisma.blog.findMany({
      where: {
        id: { not: blogId },
        keywords: { hasSome: keywords },
      },
      take: 3,
      include: {
        author: true,
      },
    });

    if (relatedBlogsByKeywords.length < 3) {
      const remainingCount = 3 - relatedBlogsByKeywords.length;

      // Get the total count of blogs excluding the current blog and already found related blogs
      const totalCount = await this.prisma.blog.count({
        where: {
          id: { not: blogId, notIn: relatedBlogsByKeywords.map((b) => b.id) },
        },
      });

      // Calculate the random skip value
      const randomSkip = Math.floor(
        Math.random() * (totalCount - remainingCount),
      );

      const randomBlogs = await this.prisma.blog.findMany({
        where: {
          id: { not: blogId, notIn: relatedBlogsByKeywords.map((b) => b.id) },
        },
        take: remainingCount,
        skip: randomSkip,
        include: {
          author: true,
        },
      });

      // Combine the related blogs and random blogs
      relatedBlogsByKeywords.push(...randomBlogs);
    }

    // Ensure the result contains exactly 3 blogs
    const finalRelatedBlogs = relatedBlogsByKeywords.slice(0, 3);

    return {
      data: finalRelatedBlogs,
    };
  }
}
