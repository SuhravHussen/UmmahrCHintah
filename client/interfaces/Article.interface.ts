import { IAuthor } from "./Author.interface";
import { PaginationInfo, PaginationLinks } from "./Common.interface";

export interface IArticle {
  id: string;
  title: string;
  content: {
    text: string;
    richText: string;
  };
  dateWritten: string;
  readingTime: string;
  keywords: string[];
  originalPostLink?: string;
  authorId: string;
  totalViews: number;
  author: IAuthor;
}

export interface GetAllArticleResponse {
  data: IArticle[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}

export interface GetSingleArticleResponse {
  data: IArticle;
  _links: {
    self: string;
    author?: string;
  };
}

export interface EmptySingleArticleResponse {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: {};
  _links: {
    self: string;
  };
}
