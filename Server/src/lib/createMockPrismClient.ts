import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';

const createMockPrismaClient = (): jest.Mocked<PrismaClient> => {
  const mockPrismaClient = mockDeep<PrismaClient>();

  // Optional: Reset mocks before each test
  mockReset(mockPrismaClient);

  return mockPrismaClient;
};

export default createMockPrismaClient;
