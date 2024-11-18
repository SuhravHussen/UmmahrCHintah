import { PaginationInfo, PaginationLinks } from './common.interface';
export interface IDetailedUser {
  created_at: string; // ISO date string
  email: string;
  email_verified: boolean;
  identities: Array<{
    connection: string;
    user_id: string;
    provider?: string;
    isSocial?: boolean;
  }>;
  last_ip: string;
  last_login: string; // ISO date string
  logins_count: number;
  name: string;
  nickname: string;
  picture: string;
  roles: Array<UserRole>;
  updated_at: string; // ISO date string
  user_id: string;
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

export interface getAllUsersResponse {
  data: IDetailedUser[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}
