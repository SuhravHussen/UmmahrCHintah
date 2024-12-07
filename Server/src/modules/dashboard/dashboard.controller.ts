import { Controller, Get, HttpException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('counts')
  async getCounts() {
    try {
      return await this.dashboardService.getTotalCounts();
    } catch (e) {
      throw new HttpException(
        {
          clientMessage: 'sorry, something wrong in getting the total numbers',
          devMessage: e.message || 'something went wrong',
        },
        e.status || 500,
      );
    }
  }
}
