import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { PrismaClient } from '@prisma/client';
import createMockPrismaClient from '../../lib/createMockPrismClient';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import mockedAuthors from '../../lib/mockAuthors';

describe('AuthorService', () => {
  let service: AuthorService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    (service as any).prisma = prismaClientMock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAuthors', () => {
    it('should retrieve all authors with pagination', async () => {
      // Mock Prisma client methods
      (prismaClientMock.author.findMany as jest.Mock).mockResolvedValue(
        mockedAuthors,
      );
      (prismaClientMock.author.count as jest.Mock).mockResolvedValue(
        mockedAuthors.length,
      );

      const result = await service.getAllAuthors(1, 10);
      expect(result).toEqual({
        _links: {
          self: '/authors?page=1&limit=10',
          next: null,
          prev: null,
        },
        data: mockedAuthors.map((author) => ({
          id: author.id,
          name: author.name,
          image: author.image,
        })),
        pagination: {
          totalPage: 1,
          totalAuthors: 2,
        },
      });

      expect(prismaClientMock.author.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { name: 'asc' },
      });
    });

    it('should handle pagination with multiple pages', async () => {
      const manyAuthors = Array(15)
        .fill(null)
        .map((_, index) => ({
          id: `author${index + 1}`,
          name: `Author ${index + 1}`,
          image: `author${index + 1}.jpg`,
        }));

      (prismaClientMock.author.findMany as jest.Mock).mockResolvedValue(
        manyAuthors.slice(10, 15),
      );
      (prismaClientMock.author.count as jest.Mock).mockResolvedValue(
        manyAuthors.length,
      );

      const result = await service.getAllAuthors(2, 5);

      expect(result.pagination).toEqual({
        totalPage: 3,
        totalAuthors: 15,
      });
      expect(result._links).toEqual({
        self: '/authors?page=2&limit=5',
        next: '/authors?page=3&limit=5',
        prev: '/authors?page=1&limit=5',
      });
    });
  });

  describe('getSingleAuthor', () => {
    it('should retrieve a single author by ID', async () => {
      const author = mockedAuthors[0];
      (prismaClientMock.author.findUnique as jest.Mock).mockResolvedValue(
        author,
      );

      const result = await service.getSingleAuthor(author.id);

      expect(result).toEqual({
        _links: {
          self: `/authors/${author.id}`,
        },
        data: {
          id: author.id,
          name: author.name,
          image: author.image,
        },
      });

      expect(prismaClientMock.author.findUnique).toHaveBeenCalledWith({
        where: { id: author.id },
      });
    });

    it('should throw an error when author is not found', async () => {
      (prismaClientMock.author.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getSingleAuthor('nonexistent-id')).rejects.toThrow(
        'Author with ID nonexistent-id not found',
      );
    });
  });

  describe('addAuthor', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'New Author',
        image: 'new-author.jpg',
      };

      const createdAuthor = {
        id: 'new-author-id',
        ...createAuthorDto,
      };

      (prismaClientMock.author.create as jest.Mock).mockResolvedValue(
        createdAuthor,
      );

      const result = await service.addAuthor(createAuthorDto);

      expect(result).toEqual({
        _links: {
          self: `/authors/${createdAuthor.id}`,
        },
        data: {
          id: createdAuthor.id,
          name: createdAuthor.name,
          image: createdAuthor.image,
        },
      });

      expect(prismaClientMock.author.create).toHaveBeenCalledWith({
        data: createAuthorDto,
      });
    });
  });

  describe('updateAuthor', () => {
    it('should update an existing author', async () => {
      const authorId = 'author1';
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Name',
      };

      const updatedAuthor = {
        ...mockedAuthors[0],
        ...updateAuthorDto,
      };

      (prismaClientMock.author.update as jest.Mock).mockResolvedValue(
        updatedAuthor,
      );

      const result = await service.updateAuthor(authorId, updateAuthorDto);

      expect(result).toEqual({
        _links: {
          self: `/authors/${authorId}`,
        },
        data: {
          id: updatedAuthor.id,
          name: updatedAuthor.name,
          image: updatedAuthor.image,
          createdAt: updatedAuthor.createdAt,
          updatedAt: updatedAuthor.updatedAt,
        },
      });

      expect(prismaClientMock.author.update).toHaveBeenCalledWith({
        where: { id: authorId },
        data: updateAuthorDto,
      });
    });

    it('should throw an error when updating a non-existent author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Name',
      };

      (prismaClientMock.author.update as jest.Mock).mockRejectedValue(
        new Error('Author not found'),
      );

      await expect(
        service.updateAuthor('nonexistent-id', updateAuthorDto),
      ).rejects.toThrow('Author not found');
    });
  });

  describe('deleteAuthor', () => {
    it('should delete an author', async () => {
      const authorId = 'author1';

      (prismaClientMock.author.delete as jest.Mock).mockResolvedValue(
        mockedAuthors[0],
      );

      const result = await service.deleteAuthor(authorId);

      expect(result).toEqual({
        message: expect.any(String),
      });

      expect(prismaClientMock.author.delete).toHaveBeenCalledWith({
        where: { id: authorId },
      });
    });

    it('should throw an error when deleting a non-existent author', async () => {
      (prismaClientMock.author.delete as jest.Mock).mockRejectedValue(
        new Error('Author not found'),
      );

      await expect(service.deleteAuthor('nonexistent-id')).rejects.toThrow(
        'Author not found',
      );
    });
  });
});
