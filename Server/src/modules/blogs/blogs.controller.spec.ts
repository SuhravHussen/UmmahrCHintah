import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaClient } from '@prisma/client';
import createMockPrismaClient from '../../lib/createMockPrismClient';
import { BlogSort } from '../../common/enums/blog.enum';
import mockedBlogs from '../../lib/mockBlogs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlogs.dto';
import { UpdateBlogDto } from './dto/updateBlog.dto';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: BlogsService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    prismaClientMock = createMockPrismaClient();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        BlogsService,
        {
          provide: PrismaClient,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBlogs', () => {
    it('should get all blogs with default pagination and sorting', async () => {
      const expectedResponse = {
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: '/blogs?page=1&limit=10&sort=recent',
          next: null,
          prev: null,
        },
      };

      jest.spyOn(service, 'getAllBlogs').mockResolvedValue(expectedResponse);

      const result = await controller.getBlogs();
      expect(result).toEqual(expectedResponse);
      expect(service.getAllBlogs).toHaveBeenCalledWith(1, 10, BlogSort.recent);
    });
  });

  describe('createBlog', () => {
    it('should create a new blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: {
          text: 'Test content',
          richText: 'Rich content',
        },
        dateWritten: new Date(),
        keywords: ['test'],
        authorId: 'author1',
      };

      const createdBlog = {
        id: 'blog1',
        ...createBlogDto,
        totalViews: 0,
        readingTime: '5 MIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'createBlog').mockResolvedValue(createdBlog);

      const result = await controller.createBlog(createBlogDto);

      expect(result).toEqual({
        data: createdBlog,
        _links: {
          self: `/blogs/${createdBlog.id}`,
          author: `authors/${createdBlog.authorId}`,
        },
      });
    });

    it('should handle errors when creating blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: {
          text: 'Test content',
          richText: 'Rich content',
        },
        dateWritten: new Date(),
        keywords: ['test'],
        authorId: 'author1',
      };

      jest
        .spyOn(service, 'createBlog')
        .mockRejectedValue(new Error('Creation failed'));

      await expect(controller.createBlog(createBlogDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getBlogById', () => {
    it('should get a blog by id', async () => {
      const expectedResponse = {
        data: mockedBlogs[0],
        _links: {
          self: `/blogs/${mockedBlogs[0].id}`,
          author: `/authors/${mockedBlogs[0].authorId}`,
        },
      };

      jest.spyOn(service, 'getBlogById').mockResolvedValue(expectedResponse);

      const result = await controller.getBlogById(mockedBlogs[0].id);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle invalid blog id', async () => {
      await expect(controller.getBlogById(':blogId')).rejects.toThrow(
        new HttpException(
          expect.objectContaining({
            devMessage: 'No blog id found',
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('updateBlogById', () => {
    it('should update a blog', async () => {
      const updateDto: UpdateBlogDto = { title: 'Updated Title' };
      const updatedBlog = {
        ...mockedBlogs[0],
        title: 'Updated Title',
      };

      const expectedResponse = {
        data: updatedBlog,
        _links: {
          self: `/blogs/${updatedBlog.id}`,
        },
      };

      jest.spyOn(service, 'updateBlogById').mockResolvedValue(expectedResponse);

      const result = await controller.updateBlogById(
        mockedBlogs[0].id,
        updateDto,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle invalid blog id during update', async () => {
      const updateDto: UpdateBlogDto = { title: 'Updated Title' };

      await expect(
        controller.updateBlogById(':blogId', updateDto),
      ).rejects.toThrow(
        new HttpException(
          expect.objectContaining({
            devMessage: 'No blog id found',
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('deleteBlogById', () => {
    it('should delete a blog', async () => {
      const expectedResponse = { message: 'Blog deleted successfully' };
      jest.spyOn(service, 'deleteBlogById').mockResolvedValue(expectedResponse);

      const result = await controller.deleteBlogById(mockedBlogs[0].id);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle invalid blog id during deletion', async () => {
      await expect(controller.deleteBlogById(':blogId')).rejects.toThrow(
        new HttpException(
          expect.objectContaining({
            devMessage: 'No blog id found',
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('updateTotalViewById', () => {
    it('should update total views', async () => {
      const expectedResponse = {
        data: { ...mockedBlogs[0], totalViews: mockedBlogs[0].totalViews + 1 },
        _links: {
          self: `/blogs/${mockedBlogs[0].id}`,
        },
      };

      jest
        .spyOn(service, 'updateTotalViews')
        .mockResolvedValue(expectedResponse);

      const result = await controller.updateTotalViewById(mockedBlogs[0].id);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getAuthorBlogs', () => {
    it('should get blogs by author', async () => {
      const expectedResponse = {
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: `/authors/${mockedBlogs[0].authorId}/blogs?page=1&limit=10`,
          next: null,
          prev: null,
        },
      };

      jest.spyOn(service, 'getAuthorBlogs').mockResolvedValue(expectedResponse);

      const result = await controller.getAuthorBlogs(mockedBlogs[0].authorId);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle invalid author id', async () => {
      await expect(controller.getAuthorBlogs(':authorId')).rejects.toThrow(
        new HttpException(
          expect.objectContaining({
            devMessage: 'No author id found',
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getSearchedBlogs', () => {
    it('should search blogs', async () => {
      const expectedResponse = {
        data: mockedBlogs,
        pagination: { totalPage: 1, totalBlogs: 2 },
        _links: {
          self: '/blogs/search?page=1&limit=10&sort=recent',
          next: null,
          prev: null,
        },
      };

      jest.spyOn(service, 'searchBlogs').mockResolvedValue(expectedResponse);

      const result = await controller.getSearchedBlogs(
        1,
        'test',
        10,
        BlogSort.recent,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getRelatedBlogs', () => {
    it('should get related blogs', async () => {
      const expectedResponse = {
        data: mockedBlogs.slice(0, 3),
      };

      jest.spyOn(service, 'getRelatedBlogs').mockResolvedValue({
        data: mockedBlogs.slice(0, 3),
      });

      const result = await controller.getRelatedBlogs(mockedBlogs[0].id);
      expect(result).toEqual(expectedResponse);
    });
  });
});
