import { GetAllAuthorsResponse, GetSingleAuthorResponse } from '../../common/interfaces/author.interface';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    getAllAuthors(page?: number, limit?: number): Promise<GetAllAuthorsResponse>;
    getAuthorById(authorId: string): Promise<any>;
    addAuthor(createAuthorDto: CreateAuthorDto): Promise<GetSingleAuthorResponse>;
    updateAuthor(authorId: string, updateAuthorDto: UpdateAuthorDto): Promise<any>;
    deleteAuthor(authorId: string): Promise<{
        message: string;
    }>;
}
