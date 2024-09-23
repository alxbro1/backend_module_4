import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ordersRepository } from './orders.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {

  constructor(private readonly ordersRepository:ordersRepository){}
  async create(createOrderDto: CreateOrderDto) {
    return await this.ordersRepository.addOrder(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string = uuid()) {
    return await this.ordersRepository.getOrder(id);
  }

}
