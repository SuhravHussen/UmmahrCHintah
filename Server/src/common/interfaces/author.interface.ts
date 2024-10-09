export interface Author {
  id: string;
  name: string;
  image: string;
}
export interface PaginationLinks {
  self: string;
  next: string | null;
  prev: string | null;
}

export interface PaginationInfo {
  totalPage: number;
  totalAuthors: number;
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
