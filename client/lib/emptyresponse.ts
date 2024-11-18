import {
  EmptySingleArticleResponse,
  GetAllArticleResponse,
} from "@/interfaces/Article.interface";
import {
  EmptySingleAuthorResponse,
  GetAllAuthorsResponse,
} from "@/interfaces/Author.interface";

export const emptyArticleListResponse: GetAllArticleResponse = {
  data: [],
  pagination: {
    totalPage: 0,
    totalArticles: 0,
  },
  _links: {
    self: "",
    prev: null,
    next: null,
  },
};

export const emptyAuthorListResponse: GetAllAuthorsResponse = {
  data: [],
  pagination: {
    totalPage: 0,
    totalAuthors: 0,
  },
  _links: {
    self: "",
    prev: null,
    next: null,
  },
};

export const emptyAuthorResponse: EmptySingleAuthorResponse = {
  data: {},
  _links: {
    self: "",
  },
};

export const emptyArticleResponse: EmptySingleArticleResponse = {
  data: {},
  _links: {
    self: "",
  },
};

export const emptyUserListResponse = {
  data: [],
  pagination: {
    totalPage: 0,
    totalAuthors: 0,
  },
  _links: {
    self: "",
    prev: null,
    next: null,
  },
};
