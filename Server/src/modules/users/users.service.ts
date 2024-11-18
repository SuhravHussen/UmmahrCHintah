import { Injectable } from '@nestjs/common';
import getManagementToken from '../../lib/getAuth0ManagmentToken';
import {
  getAllUsersResponse,
  UserRole,
} from '../../common/interfaces/user.interface';

@Injectable()
export class UsersService {
  async getUsers(
    page = 0,
    perPage = 10,
    email?: string,
    roleId?: string,
  ): Promise<getAllUsersResponse> {
    try {
      const token = await getManagementToken();

      let users = [];
      let totalUsers = 0;

      if (roleId) {
        // Fetch users associated with the role
        const roleUsersUrl = `${process.env.AUTH0_API}/api/v2/roles/${roleId}/users?page=${page}&per_page=${perPage}&include_totals=true`;
        const roleUsersResponse = await fetch(roleUsersUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!roleUsersResponse.ok) {
          throw new Error(
            `Failed to fetch users by role: ${roleUsersResponse.statusText}`,
          );
        }

        const { users: fetchedUsers, total } = await roleUsersResponse.json();

        users = fetchedUsers;
        totalUsers = total;
      } else {
        // Fetch users with optional email search
        let url = `${process.env.AUTH0_API}/api/v2/users?page=${page}&per_page=${perPage}&search_engine=v3&include_totals=true`;
        if (email) {
          url += `&q=${encodeURIComponent(`email:${email}`)}`;
        }

        const usersResponse = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.statusText}`);
        }

        const { users: fetchedUsers, total } = await usersResponse.json();

        users = fetchedUsers;
        totalUsers = total;
      }

      const totalPages = Math.ceil(totalUsers / perPage);

      // Fetch roles for each user
      const usersWithRoles = await Promise.all(
        users.map(async (user: any) => {
          const rolesResponse = await fetch(
            `${process.env.AUTH0_API}/api/v2/users/${user.user_id}/roles`,
            { headers: { Authorization: `Bearer ${token}` } },
          );

          if (!rolesResponse.ok) {
            throw new Error(
              `Failed to fetch roles for user ${user.user_id}: ${rolesResponse.statusText}`,
            );
          }

          const roles = await rolesResponse.json();
          return { ...user, roles };
        }),
      );

      // Generate _links
      const _links = {
        self: `/users?page=${page}&per_page=${perPage}${email ? `&q=${encodeURIComponent(`email:${email}`)}` : ''}`,
        prev:
          page > 0
            ? `/users?page=${page - 1}&per_page=${perPage}${email ? `&q=${encodeURIComponent(`email:${email}`)}` : ''}`
            : null,
        next:
          page < totalPages - 1
            ? `/users?page=${page + 1}&per_page=${perPage}${email ? `&q=${encodeURIComponent(`email:${email}`)}` : ''}`
            : null,
      };

      return {
        data: usersWithRoles,
        pagination: {
          totalPage: totalPages,
          totalUsers: totalUsers,
        },
        _links,
      };
    } catch (error) {
      console.error('Error fetching users and roles:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<{
    userId: string;
  }> {
    try {
      const token = await getManagementToken();

      const response = await fetch(
        `${process.env.AUTH0_API}/api/v2/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete user ${userId}: ${response.statusText}`,
        );
      }

      const data = {
        userId: userId,
      };

      return data;
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }

  async getAllRoles(): Promise<UserRole[]> {
    try {
      const token = await getManagementToken();

      const response = await fetch(`${process.env.AUTH0_API}/api/v2/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch roles: ${response.statusText}`);
      }

      const roles = await response.json();
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async assignRoles(
    userId: string,
    roleIds: string[],
  ): Promise<{
    roles: string[];
  }> {
    try {
      const token = await getManagementToken();

      const response = await fetch(
        `${process.env.AUTH0_API}/api/v2/users/${userId}/roles`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roles: roleIds, // List of role IDs to assign
          }),
        },
      );

      if (!response.ok) {
        const t = await response.json();
        console.log(t);
        throw new Error(
          `Failed to assign roles to user ${userId}: ${response.statusText}`,
        );
      }
      const data = {
        roles: roleIds,
      };
      return data;
    } catch (error) {
      console.error(`Error assigning roles to user ${userId}:`, error);
      throw error;
    }
  }

  async removeRoles(
    userId: string,
    roleIds: string[],
  ): Promise<{
    roles: string[];
  }> {
    try {
      const token = await getManagementToken();

      const response = await fetch(
        `${process.env.AUTH0_API}/api/v2/users/${userId}/roles`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roles: roleIds,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to remove roles from user ${userId}: ${response.statusText}`,
        );
      }
      const data = {
        roles: roleIds,
      };
      return data;
    } catch (error) {
      console.error(`Error removing roles from user ${userId}:`, error);
      throw error;
    }
  }
}
