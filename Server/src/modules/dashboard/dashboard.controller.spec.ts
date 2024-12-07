import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const mockDashboardService = {
      getTotalCounts: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getCounts', () => {
    it('should return total counts successfully', async () => {
      const expectedResponse = {
        totalBlogs: 10,
        totalAuthors: 5,
      };

      jest.spyOn(service, 'getTotalCounts').mockResolvedValue(expectedResponse);

      const result = await controller.getCounts();

      expect(result).toEqual(expectedResponse);
      expect(service.getTotalCounts).toHaveBeenCalled();
    });
  });
});
