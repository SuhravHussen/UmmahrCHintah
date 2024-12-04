import { PrismaClient } from '@prisma/client';

const createMockPrismaClient = (): jest.Mocked<PrismaClient> => {
  return {
    blog: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
      // Add other methods as needed
    },
    $executeRaw: jest.fn(),
    $executeRawUnsafe: jest.fn(),
    $queryRaw: jest.fn(),
    $queryRawUnsafe: jest.fn(),
    $on: jest.fn(),
    $use: jest.fn(),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $transaction: jest.fn(),
  } as unknown as jest.Mocked<PrismaClient>;
};

export default createMockPrismaClient;
