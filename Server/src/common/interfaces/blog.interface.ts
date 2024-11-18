import { PaginationInfo, PaginationLinks } from './common.interface';

export interface Blog {
  id: string; // Unique identifier for the blog
  title: string; // Title of the blog
  content: any; // Content of the blog, using 'any' to support JSON structure
  dateWritten: Date; // Date when the blog was written
  readingTime: string; // Estimated reading time
  keywords: string[]; // Array of keywords associated with the blog
  originalPostLink?: string; // Optional link to the original post
  authorId: string; // ID of the author
  totalViews: number; // Number of views the blog has received
}

export interface GetAllBlogsResponse {
  data: Blog[];
  pagination: PaginationInfo;
  _links: PaginationLinks;
}

export interface GetSingleBlogResponse {
  data: Blog;
  _links: {
    self: string;
    author?: string;
  };
}
