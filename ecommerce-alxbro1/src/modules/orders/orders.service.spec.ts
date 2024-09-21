import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ordersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ordersEntity } from '../../entities/orders.entity';
import { BadRequestException } from '@nestjs/common';
import { enumRole } from '../auth/dto/role.enum';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepo: ordersRepository;

  // Mock de una orden
  const mockOrder: ordersEntity = {
    id: 'order123',
    date: new Date(),
    user_id: {
      id: 'user123',
      name: 'johnDoe',
      email: 'john@example.com',
      password: 'hashedpassword',
      role: enumRole.user,
      phone: 4123123123,
      country: 'USA',
      city:'california',
      address: 'adawdawd'
    },
    orderDetails_id: 'orderDetail123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ordersRepository,
          useValue: {
            addOrder: jest.fn().mockResolvedValue(mockOrder),
            getOrder: jest.fn().mockResolvedValue(mockOrder),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepo = module.get<ordersRepository>(ordersRepository);
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 'user123',
        products: [{ id: 'product123' }, { id: 'product456' }],
      };

      const result = await service.create(createOrderDto);

      expect(orderRepo.addOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrder);
    });

    it('should throw an exception if user not found', async () => {
      jest
        .spyOn(orderRepo, 'addOrder')
        .mockRejectedValue(new BadRequestException('User not found'));

      const createOrderDto: CreateOrderDto = {
        userId: 'invalidUser',
        products: [{ id: 'product123' }],
      };

      await expect(service.create(createOrderDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single order by id', async () => {
      const id = 'order123';
      const result = await service.findOne(id);

      expect(orderRepo.getOrder).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockOrder);
    });

    it('should throw an exception if order not found', async () => {
      const id = 'invalidOrderId';
      jest
        .spyOn(orderRepo, 'getOrder')
        .mockRejectedValue(new BadRequestException('order not found'));

      await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
    });
  });
});
