import { PaginationInfo } from "./Common.interface";
import { PaginationLinks } from "./Common.interface";

export interface IAuthor {
  id: string;
  name: string;
  image: string;
}

export interface GetAllAuthorsResponse {
  data: IAuthor[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}

export interface GetSingleAuthorResponse {
  data: IAuthor;
  _links: {
    self: string;
    author?: string;
  };
}

export interface EmptySingleAuthorResponse {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: {};
  _links: {
    self: string;
  };
}
