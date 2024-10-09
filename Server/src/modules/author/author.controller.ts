import {
  GetAllAuthorsResponse,
  GetSingleAuthorResponse,
} from '../../common/interfaces/author.interface';
import { AuthorService } from './author.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(
    @Query('page') page: number = 1, // Default page = 1
    @Query('limit') limit: number = 10, // Default limit = 10
  ): Promise<GetAllAuthorsResponse> {
    try {
      return await this.authorService.getAllAuthors(page, limit);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while fetching the authors',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':authorId')
  async getAuthorById(@Param('authorId') authorId: string): Promise<any> {
    try {
      if (authorId === ':authorId') throw new Error('No authorid found');
      return await this.authorService.getSingleAuthor(authorId);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while fetching the author',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async addAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<GetSingleAuthorResponse> {
    try {
      return await this.authorService.addAuthor(createAuthorDto);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry, something went wrong while adding the author',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':authorId')
  async updateAuthor(
    @Param('authorId') authorId: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<any> {
    try {
      if (authorId === ':authorId') throw new Error('No authorid found');
      const updatedAuthor = await this.authorService.updateAuthor(
        authorId,
        updateAuthorDto,
      );
      return updatedAuthor;
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while updating the author',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':authorId')
  async deleteAuthor(
    @Param('authorId') authorId: string,
  ): Promise<{ message: string }> {
    try {
      if (authorId === ':authorId') throw new Error('No authorid found');
      return await this.authorService.deleteAuthor(authorId);
    } catch (error) {
      // Handle error based on the type
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            devMessage: error.message,
            clientMessage: `Author with ID ${authorId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while deleting the author',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
