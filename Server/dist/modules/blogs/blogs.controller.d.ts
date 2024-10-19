import { GetAllBlogsResponse, GetSingleBlogResponse } from './../../common/interfaces/blog.interface';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlogs.dto';
import { BlogSort } from '../../common/enums/blog.enum';
import { UpdateBlogDto } from './dto/updateBlog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getBlogs(page?: number, limit?: number, sort?: BlogSort): Promise<GetAllBlogsResponse>;
    createBlog(createBlogDto: CreateBlogDto): Promise<GetSingleBlogResponse>;
    getBlogById(blogId: string): Promise<GetSingleBlogResponse>;
    updateBlogById(blogId: string, updateData: UpdateBlogDto): Promise<GetSingleBlogResponse>;
    deleteBlogById(blogId: string): Promise<{
        message: string;
    }>;
    getAuthorBlogs(authorId: string, page?: number, limit?: number): Promise<GetAllBlogsResponse>;
    cm2cukv7c0000fc5amff6eby4: any;
    getSearchedBlogs(page: number, query: string, limit: number, sort?: BlogSort): Promise<GetAllBlogsResponse>;
}
