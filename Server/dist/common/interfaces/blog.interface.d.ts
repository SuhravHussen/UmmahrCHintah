export interface Blog {
    id: string;
    title: string;
    content: any;
    dateWritten: Date;
    readingTime: string;
    keywords: string[];
    originalPostLink?: string;
    authorId: string;
    totalViews: number;
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
        author?: string;
    };
}
