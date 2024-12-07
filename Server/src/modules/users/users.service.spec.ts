import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// Mock getManagementToken
jest.mock('../../lib/getAuth0ManagmentToken', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('mock-token'),
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = {
    user_id: 'auth0|123',
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockRole = {
    id: 'role1',
    name: 'admin',
    description: 'Administrator role',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should get all users with pagination', async () => {
      const mockResponse = {
        users: [mockUser],
        total: 1,
      };

      const mockRolesResponse = [mockRole];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockRolesResponse),
        });

      const result = await service.getUsers(0, 10);
      console.log(result);
      expect(result).toEqual({
        data: [{ ...mockUser, roles: mockRolesResponse }],
        pagination: {
          totalPage: 1,
          totalUsers: 1,
        },
        _links: {
          self: '/users?page=0&per_page=10',
          prev: null,
          next: null,
        },
      });
    });

    it('should get users by role', async () => {
      const mockResponse = {
        users: [mockUser],
        total: 1,
      };

      const mockRolesResponse = [mockRole];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockRolesResponse),
        });

      const result = await service.getUsers(0, 10, undefined, 'role1');

      expect(result.data).toEqual([{ ...mockUser, roles: mockRolesResponse }]);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      const result = await service.deleteUser('auth0|123');

      expect(result).toEqual({
        userId: 'auth0|123',
      });
    });
  });

  describe('getAllRoles', () => {
    it('should get all roles successfully', async () => {
      const mockRoles = [mockRole];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRoles),
      });

      const result = await service.getAllRoles();

      expect(result).toEqual(mockRoles);
    });
  });

  describe('assignRoles', () => {
    it('should assign roles successfully', async () => {
      const roleIds = ['role1', 'role2'];

      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      const result = await service.assignRoles('auth0|123', roleIds);

      expect(result).toEqual({
        roles: roleIds,
      });
    });
  });

  describe('removeRoles', () => {
    it('should remove roles successfully', async () => {
      const roleIds = ['role1', 'role2'];

      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      const result = await service.removeRoles('auth0|123', roleIds);

      expect(result).toEqual({
        roles: roleIds,
      });
    });
  });
});
