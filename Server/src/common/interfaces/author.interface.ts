import { PaginationInfo, PaginationLinks } from './common.interface';

export interface Author {
  id: string;
  name: string;
  image: string;
}

export interface GetAllAuthorsResponse {
  data: Author[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}

export interface GetSingleAuthorResponse {
  data: Author;
  _links: {
    self: string;
    author?: string;
  };
}
