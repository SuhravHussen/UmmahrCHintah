import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  getAllUsersResponse,
  UserRole,
} from '../../common/interfaces/user.interface';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(['moderator'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Get()
  async getUsers(
    @Query('page') page = 0,
    @Query('perPage') perPage = 10,
    @Query('email') email?: string,
    @Query('roleId') roleId?: string,
  ): Promise<getAllUsersResponse> {
    try {
      return await this.userService.getUsers(page, perPage, email, roleId);
    } catch (error) {
      console.error('Error getting users:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Delete(':userId')
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<{ userId: string }> {
    try {
      return await this.userService.deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(['moderator'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Get('roles')
  async getAllRoles(): Promise<UserRole[]> {
    try {
      return await this.userService.getAllRoles();
    } catch (error) {
      console.error('Error getting roles:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Post('assign-roles/:userId')
  async assignRoles(
    @Param('userId') userId: string,
    @Body() body: { roleIds: string[] },
  ): Promise<{
    roles: string[];
  }> {
    try {
      return await this.userService.assignRoles(userId, body.roleIds);
    } catch (error) {
      console.error('Error assigning roles:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Post('remove-roles/:userId')
  async removeRoles(
    @Param('userId') userId: string,
    @Body() body: { roleIds: string[] },
  ): Promise<{
    roles: string[];
  }> {
    try {
      return await this.userService.removeRoles(userId, body.roleIds);
    } catch (error) {
      console.error('Error removing roles:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
