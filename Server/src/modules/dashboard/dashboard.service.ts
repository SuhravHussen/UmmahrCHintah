import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DashboardService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTotalCounts(): Promise<{
    totalBlogs: number;
    totalAuthors: number;
  }> {
    const totalBlogs = await this.prisma.blog.count();
    const totalAuthors = await this.prisma.author.count();

    return {
      totalBlogs,
      totalAuthors,
    };
  }
}
