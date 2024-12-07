import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import createMockPrismaClient from '../../lib/createMockPrismClient';

describe('DashboardService', () => {
  let service: DashboardService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    (service as any).prisma = prismaClientMock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTotalCounts', () => {
    it('should return total counts of blogs and authors', async () => {
      const mockTotalBlogs = 10;
      const mockTotalAuthors = 5;

      (prismaClientMock.blog.count as jest.Mock).mockResolvedValue(
        mockTotalBlogs,
      );
      (prismaClientMock.author.count as jest.Mock).mockResolvedValue(
        mockTotalAuthors,
      );

      const result = await service.getTotalCounts();

      expect(result).toEqual({
        totalBlogs: mockTotalBlogs,
        totalAuthors: mockTotalAuthors,
      });

      expect(prismaClientMock.blog.count).toHaveBeenCalled();
      expect(prismaClientMock.author.count).toHaveBeenCalled();
    });
  });
});
