import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlogs.dto';
import calculateReadingTime from '../../lib/calculateReadingTime';
import createMockPrismaClient from '../../lib/createMockPrismClient';
import { BlogSort } from '../../common/enums/blog.enum';
import mockedBlogs from '../../lib/mockBlogs';

describe('BlogsService', () => {
  let service: BlogsService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    (service as any).prisma = prismaClientMock;
  });

  describe('Blog Creation', () => {
    it('should create a blog successfully', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: {
          text: 'This is a test blog content',
          richText: 'sdsdsd sdsdsd sdsd',
        },
        dateWritten: new Date(),
        keywords: ['keyword1', 'keyword2'],
        authorId: 'author-id',
      };

      const expectedReadingTime = calculateReadingTime(
        createBlogDto.content.text,
      );
      const mockCreatedBlog = {
        id: 'test-blog-id',
        ...createBlogDto,
        totalViews: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        readingTime: expectedReadingTime,
      };

      (prismaClientMock.blog.create as jest.Mock).mockResolvedValue(
        mockCreatedBlog,
      );

      const result = await service.createBlog(createBlogDto);

      expect(prismaClientMock.blog.create).toHaveBeenCalledWith({
        data: {
          ...createBlogDto,
          totalViews: 0,
          readingTime: expectedReadingTime,
        },
      });
      expect(result).toEqual(mockCreatedBlog);
    });

    it('should handle creation error', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: { text: 'This is a test blog content', richText: '' },
        dateWritten: new Date(),
        keywords: ['keyword1', 'keyword2'],
        authorId: 'author-id',
      };

      (prismaClientMock.blog.create as jest.Mock).mockRejectedValue(
        new Error('Database connection error'),
      );

      await expect(service.createBlog(createBlogDto)).rejects.toThrow(
        'Database connection error',
      );
    });
  });

  describe('Blog Retrieval', () => {
    it('should get all blogs with pagination', async () => {
      (prismaClientMock.blog.findMany as jest.Mock).mockResolvedValue(
        mockedBlogs,
      );
      (prismaClientMock.blog.count as jest.Mock).mockResolvedValue(
        mockedBlogs.length,
      );

      const result = await service.getAllBlogs(1, 10, BlogSort.recent);

      expect(result).toEqual({
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: '/blogs?page=1&limit=10&sort=recent',
          next: null,
          prev: null,
        },
      });
    });

    it('should get blog by id', async () => {
      (prismaClientMock.blog.findUnique as jest.Mock).mockResolvedValue(
        mockedBlogs[0],
      );

      const result = await service.getBlogById(mockedBlogs[0].id);

      expect(result).toEqual({
        data: mockedBlogs[0],
        _links: {
          self: `/blogs/${mockedBlogs[0].id}`,
          author: `/authors/${mockedBlogs[0].authorId}`,
        },
      });
    });

    it('should get author blogs', async () => {
      (prismaClientMock.blog.findMany as jest.Mock).mockResolvedValue(
        mockedBlogs,
      );
      (prismaClientMock.blog.count as jest.Mock).mockResolvedValue(
        mockedBlogs.length,
      );

      const result = await service.getAuthorBlogs(
        mockedBlogs[0].authorId,
        1,
        10,
      );

      expect(result).toEqual({
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: `/authors/${mockedBlogs[0].authorId}/blogs?page=1&limit=10`,
          next: null,
          prev: null,
        },
      });
    });

    it('should search blogs', async () => {
      (prismaClientMock.blog.findMany as jest.Mock).mockResolvedValue(
        mockedBlogs,
      );
      (prismaClientMock.blog.count as jest.Mock).mockResolvedValue(
        mockedBlogs.length,
      );

      const result = await service.searchBlogs(1, 'test', 10, BlogSort.recent);

      expect(result).toEqual({
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: expect.any(String),
          next: null,
          prev: null,
        },
      });
    });

    describe('Related Blogs', () => {
      it('should get related blogs', async () => {
        const currentBlog = {
          ...mockedBlogs[0],
          keywords: ['javascript', 'testing'],
        };
        const relatedBlogsByKeywords = [mockedBlogs[1]];
        const randomBlogs = [
          { ...mockedBlogs[0], id: '3' },
          { ...mockedBlogs[1], id: '4' },
        ];

        (prismaClientMock.blog.findUnique as jest.Mock).mockResolvedValue(
          currentBlog,
        );
        (prismaClientMock.blog.findMany as jest.Mock)
          .mockResolvedValueOnce(relatedBlogsByKeywords)
          .mockResolvedValueOnce(randomBlogs);
        (prismaClientMock.blog.count as jest.Mock).mockResolvedValue(2);

        const result = await service.getRelatedBlogs(currentBlog.id);

        expect(result).toEqual({
          data: expect.arrayContaining([
            relatedBlogsByKeywords[0],
            ...randomBlogs.slice(0, 2),
          ]),
        });
        expect(result.data).toHaveLength(3);
      });
    });
  });

  describe('Blog Updates', () => {
    it('should update blog by id', async () => {
      (prismaClientMock.blog.update as jest.Mock).mockResolvedValue(
        mockedBlogs[0],
      );

      const result = await service.updateBlogById(mockedBlogs[0].id, {
        title: 'Updated Blog',
      });

      expect(result).toEqual({
        data: mockedBlogs[0],
        _links: {
          self: `/blogs/${mockedBlogs[0].id}`,
        },
      });
    });

    it('should update total views', async () => {
      (prismaClientMock.blog.update as jest.Mock).mockResolvedValue(
        mockedBlogs[0],
      );

      const result = await service.updateTotalViews(mockedBlogs[0].id);

      expect(result).toEqual({
        data: mockedBlogs[0],
        _links: {
          self: `/blogs/${mockedBlogs[0].id}`,
        },
      });
    });
  });

  describe('Blog Deletion', () => {
    it('should delete blog by id', async () => {
      (prismaClientMock.blog.delete as jest.Mock).mockResolvedValue({
        message: 'Blog deleted successfully',
      });

      const result = await service.deleteBlogById(mockedBlogs[0].id);

      expect(result).toEqual({
        message: 'Blog deleted successfully',
      });
    });
  });
});
