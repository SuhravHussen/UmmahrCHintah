import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlogs.dto';
import calculateReadingTime from '../../common/lib/calculateReadingTime';

// Create a comprehensive mock that satisfies TypeScript's type checking
const createMockPrismaClient = (): jest.Mocked<PrismaClient> => {
  return {
    blog: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
      // Add other methods as needed
    },
    $executeRaw: jest.fn(),
    $executeRawUnsafe: jest.fn(),
    $queryRaw: jest.fn(),
    $queryRawUnsafe: jest.fn(),
    $on: jest.fn(),
    $use: jest.fn(),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $transaction: jest.fn(),
  } as unknown as jest.Mocked<PrismaClient>;
};

describe('BlogsService', () => {
  let service: BlogsService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    // Create a comprehensive mock
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
  });

  it('should create a blog', async () => {
    // Prepare mock input data
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

    // Mock the Prisma create method to return a predefined response
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

    // Call the service method
    const result = await service.createBlog(createBlogDto);

    // Assertions
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
    // Prepare mock input data
    const createBlogDto: CreateBlogDto = {
      title: 'Test Blog',
      content: { text: 'This is a test blog content', richText: '' },
      dateWritten: new Date(),
      keywords: ['keyword1', 'keyword2'],
      authorId: 'author-id',
    };

    // Mock the Prisma create method to throw an error
    (prismaClientMock.blog.create as jest.Mock).mockRejectedValue(
      new Error('Database connection error'),
    );

    // Expect the method to throw an error
    await expect(service.createBlog(createBlogDto)).rejects.toThrow(
      'Database connection error',
    );
  });
});
