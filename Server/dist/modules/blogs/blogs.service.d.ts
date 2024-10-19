import { CreateBlogDto } from './dto/createBlogs.dto';
import { Blog, GetAllBlogsResponse, GetSingleBlogResponse } from '../../common/interfaces/blog.interface';
import { BlogSort } from '../../common/enums/blog.enum';
import { UpdateBlogDto } from './dto/updateBlog.dto';
export declare class BlogsService {
    private prisma;
    constructor();
    createBlog(blogData: CreateBlogDto): Promise<Blog>;
    getAllBlogs(page: number, limit: number, sort: BlogSort): Promise<GetAllBlogsResponse>;
    getBlogById(id: string): Promise<GetSingleBlogResponse>;
    updateBlogById(id: string, data: UpdateBlogDto): Promise<GetSingleBlogResponse>;
    deleteBlogById(id: string): Promise<{
        message: string;
    }>;
    getAuthorBlogs(authorId: string, page: number, limit: number): Promise<GetAllBlogsResponse>;
    searchBlogs(page: number, query: string, limit: number, sort: BlogSort): Promise<GetAllBlogsResponse>;
}
