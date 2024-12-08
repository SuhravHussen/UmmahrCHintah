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

  async getBlogsPerDate(
    date: Date,
  ): Promise<{ data: Array<{ date: Date; weight: number }> }> {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const blogsPerDate = await this.prisma.$queryRaw<
      Array<{ date: string; blogsnumber: string }>
    >`
      SELECT DATE("dateWritten") as date, CAST(COUNT(*) AS INTEGER) as blogsNumber
      FROM "Blog"
      WHERE "dateWritten" >= ${startOfMonth} AND "dateWritten" <= ${endOfMonth}
      GROUP BY DATE("dateWritten")
      ORDER BY date ASC
    `;

    return {
      data: blogsPerDate.map((item) => ({
        date: new Date(item.date),
        weight: item.blogsnumber as unknown as number,
      })),
    };
  }
}
