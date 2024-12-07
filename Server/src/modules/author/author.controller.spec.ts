import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaClient } from '@prisma/client';
import createMockPrismaClient from '../../lib/createMockPrismClient';
import { HttpException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  const mockAuthor = {
    id: 'author1',
    name: 'Test Author',
    image: 'test-image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        AuthorService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAuthors', () => {
    it('should get all authors with default pagination', async () => {
      const expectedResponse = {
        data: [mockAuthor],
        pagination: { totalPage: 1, totalAuthors: 1 },
        _links: {
          self: '/authors?page=1&limit=10',
          next: null,
          prev: null,
        },
      };

      jest.spyOn(service, 'getAllAuthors').mockResolvedValue(expectedResponse);

      const result = await controller.getAllAuthors();
      expect(result).toEqual(expectedResponse);
      expect(service.getAllAuthors).toHaveBeenCalledWith(1, 10);
    });

    it('should handle errors when getting all authors', async () => {
      jest
        .spyOn(service, 'getAllAuthors')
        .mockRejectedValue(new Error('Test error'));

      await expect(controller.getAllAuthors()).rejects.toThrow(HttpException);
    });
  });

  describe('getAuthorById', () => {
    it('should get a single author by id', async () => {
      const expectedResponse = {
        data: mockAuthor,
        _links: {
          self: `/authors/${mockAuthor.id}`,
          blogs: `/blogs?authorId=${mockAuthor.id}`,
        },
      };

      jest
        .spyOn(service, 'getSingleAuthor')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getAuthorById(mockAuthor.id);
      expect(result).toEqual(expectedResponse);
      expect(service.getSingleAuthor).toHaveBeenCalledWith(mockAuthor.id);
    });

    it('should throw error when authorId is invalid', async () => {
      await expect(controller.getAuthorById(':authorId')).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('addAuthor', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author',
        image: 'test-image.jpg',
      };

      const expectedResponse = {
        data: mockAuthor,
        _links: {
          self: `/authors/${mockAuthor.id}`,
          blogs: `/blogs?authorId=${mockAuthor.id}`,
        },
      };

      jest.spyOn(service, 'addAuthor').mockResolvedValue(expectedResponse);

      const result = await controller.addAuthor(createAuthorDto);
      expect(result).toEqual(expectedResponse);
      expect(service.addAuthor).toHaveBeenCalledWith(createAuthorDto);
    });

    it('should handle errors when creating author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author',
        image: 'test-image.jpg',
      };

      jest
        .spyOn(service, 'addAuthor')
        .mockRejectedValue(new Error('Test error'));

      await expect(controller.addAuthor(createAuthorDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('updateAuthor', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Author',
      };

      const expectedResponse = {
        data: { ...mockAuthor, ...updateAuthorDto },
        _links: {
          self: `/authors/${mockAuthor.id}`,
          blogs: `/blogs?authorId=${mockAuthor.id}`,
        },
      };

      jest.spyOn(service, 'updateAuthor').mockResolvedValue(expectedResponse);

      const result = await controller.updateAuthor(
        mockAuthor.id,
        updateAuthorDto,
      );
      expect(result).toEqual(expectedResponse);
      expect(service.updateAuthor).toHaveBeenCalledWith(
        mockAuthor.id,
        updateAuthorDto,
      );
    });

    it('should throw error when authorId is invalid', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Author',
      };

      await expect(
        controller.updateAuthor(':authorId', updateAuthorDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('deleteAuthor', () => {
    it('should delete an author', async () => {
      const expectedResponse = { message: 'Author deleted successfully' };
      jest.spyOn(service, 'deleteAuthor').mockResolvedValue(expectedResponse);

      const result = await controller.deleteAuthor(mockAuthor.id);
      expect(result).toEqual(expectedResponse);
      expect(service.deleteAuthor).toHaveBeenCalledWith(mockAuthor.id);
    });

    it('should throw error when authorId is invalid', async () => {
      await expect(controller.deleteAuthor(':authorId')).rejects.toThrow(
        HttpException,
      );
    });
  });
});
