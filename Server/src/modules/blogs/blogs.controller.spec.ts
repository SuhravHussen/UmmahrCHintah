import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaClient } from '@prisma/client';

describe('BlogsController', () => {
  let controller: BlogsController;
  let prismaClientMock: jest.Mocked<PrismaClient>;
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

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        BlogsService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
