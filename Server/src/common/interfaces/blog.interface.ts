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

export interface PaginationLinks {
  self: string;
  next: string | null;
  prev: string | null;
}

export interface PaginationInfo {
  totalPage: number;
  totalBlogs: number;
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
    author: string;
  };
}
