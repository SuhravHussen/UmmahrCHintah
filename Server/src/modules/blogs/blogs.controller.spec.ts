import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaClient } from '@prisma/client';
import createMockPrismaClient from '../../lib/createMockPrismClient';

describe('BlogsController', () => {
  let controller: BlogsController;
  let prismaClientMock: jest.Mocked<PrismaClient>;

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
