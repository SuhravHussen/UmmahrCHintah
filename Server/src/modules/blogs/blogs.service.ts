import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogDto } from './dto/createBlogs.dto';
import { Blog } from '../../common/interfaces/blog.interface';
import calculateReadingTime from '../../common/lib/calculateReadingTime';

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
}
