import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    user_id: 'auth0|123',
    email: 'test@example.com',
    name: 'Test User',
    // Add these missing properties:
    created_at: new Date().toISOString(),
    email_verified: true,
    identities: [
      {
        connection: 'username-password-authentication',
        user_id: 'auth0|123',
        provider: 'auth0',
      },
    ],
    last_ip: '127.0.0.1',
    last_login: new Date().toISOString(),
    logins_count: 1,
    nickname: 'testuser',
    picture: 'https://example.com/avatar.jpg',
    updated_at: new Date().toISOString(),
  };

  const mockRole = {
    id: 'role1',
    name: 'admin',
    description: 'Administrator role',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should get all users with default pagination', async () => {
      const expectedResponse = {
        data: [{ ...mockUser, roles: [mockRole] }],
        pagination: {
          totalPage: 1,
          totalUsers: 1,
        },
        _links: {
          self: '/users?page=0&per_page=10',
          prev: null,
          next: null,
        },
      };

      jest.spyOn(service, 'getUsers').mockResolvedValue(expectedResponse);

      const result = await controller.getUsers();

      expect(result).toEqual(expectedResponse);
      expect(service.getUsers).toHaveBeenCalledWith(
        0,
        10,
        undefined,
        undefined,
      );
    });

    it('should get users with custom pagination and filters', async () => {
      const expectedResponse = {
        data: [{ ...mockUser, roles: [mockRole] }],
        pagination: {
          totalPage: 1,
          totalUsers: 1,
        },
        _links: {
          self: '/users?page=1&per_page=5&email=test@example.com',
          prev: null,
          next: null,
        },
      };

      jest.spyOn(service, 'getUsers').mockResolvedValue(expectedResponse);

      const result = await controller.getUsers(1, 5, 'test@example.com');

      expect(result).toEqual(expectedResponse);
      expect(service.getUsers).toHaveBeenCalledWith(
        1,
        5,
        'test@example.com',
        undefined,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const expectedResponse = { userId: 'auth0|123' };
      jest.spyOn(service, 'deleteUser').mockResolvedValue(expectedResponse);

      const result = await controller.deleteUser('auth0|123');

      expect(result).toEqual(expectedResponse);
      expect(service.deleteUser).toHaveBeenCalledWith('auth0|123');
    });
  });

  describe('getAllRoles', () => {
    it('should get all roles successfully', async () => {
      const expectedResponse = [mockRole];
      jest.spyOn(service, 'getAllRoles').mockResolvedValue(expectedResponse);

      const result = await controller.getAllRoles();

      expect(result).toEqual(expectedResponse);
      expect(service.getAllRoles).toHaveBeenCalled();
    });
  });

  describe('assignRoles', () => {
    it('should assign roles successfully', async () => {
      const roleIds = ['role1', 'role2'];
      const expectedResponse = { roles: roleIds };
      jest.spyOn(service, 'assignRoles').mockResolvedValue(expectedResponse);

      const result = await controller.assignRoles('auth0|123', { roleIds });

      expect(result).toEqual(expectedResponse);
      expect(service.assignRoles).toHaveBeenCalledWith('auth0|123', roleIds);
    });
  });

  describe('removeRoles', () => {
    it('should remove roles successfully', async () => {
      const roleIds = ['role1', 'role2'];
      const expectedResponse = { roles: roleIds };
      jest.spyOn(service, 'removeRoles').mockResolvedValue(expectedResponse);

      const result = await controller.removeRoles('auth0|123', { roleIds });

      expect(result).toEqual(expectedResponse);
      expect(service.removeRoles).toHaveBeenCalledWith('auth0|123', roleIds);
    });
  });
});
