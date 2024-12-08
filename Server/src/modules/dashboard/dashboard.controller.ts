import { Controller, Get, HttpException, Query } from '@nestjs/common';
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

  @Get('blogs-per-date')
  async getBlogsPerDate(@Query('date') date: Date = new Date()) {
    try {
      return await this.dashboardService.getBlogsPerDate(new Date(date));
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
