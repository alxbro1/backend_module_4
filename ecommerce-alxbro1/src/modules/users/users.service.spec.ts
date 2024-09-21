import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepository } from './users.repository';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

const moduleMocker = new ModuleMocker(global);

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === userRepository) {
          return {
            findAllUsers: jest.fn().mockResolvedValue([]),
            findOneUser: jest.fn().mockResolvedValue({
              id: uuid(),
              name: 'John Doe',
              email: 'john.doe@example.com',
              phone: 123456789,
              address: '1234 Main St',
              city: 'Cityville',
              country: 'Countryland',
              orders: [],
            }),
            update: jest.fn().mockResolvedValue('Update succesfuly'),
            delete: jest.fn().mockResolvedValue('Delete succesfuly'),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = moduleRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const id = uuid();
      const result = await service.findOne(id);
      expect(result).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: 123456789,
        address: '1234 Main St',
        city: 'Cityville',
        country: 'Countryland',
        orders: [],
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = uuid();
      const dto: UpdateUserDto = { name: 'Updated Name' };
      const result = await service.update(id, dto);
      expect(result).toBe('Update succesfuly');
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = uuid();
      const result = await service.remove(id);
      expect(result).toBe('Delete succesfuly');
    });
  });
});
