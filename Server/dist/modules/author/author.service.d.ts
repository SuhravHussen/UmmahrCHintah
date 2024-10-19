import { GetAllAuthorsResponse, GetSingleAuthorResponse } from '../../common/interfaces/author.interface';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { CreateAuthorDto } from './dto/createAuthor.dto';
export declare class AuthorService {
    private prisma;
    constructor();
    getAllAuthors(page?: number, limit?: number): Promise<GetAllAuthorsResponse>;
    getSingleAuthor(authorId: string): Promise<GetSingleAuthorResponse>;
    addAuthor(authorData: CreateAuthorDto): Promise<GetSingleAuthorResponse>;
    updateAuthor(id: string, data: UpdateAuthorDto): Promise<any>;
    deleteAuthor(authorId: string): Promise<{
        message: string;
    }>;
}
