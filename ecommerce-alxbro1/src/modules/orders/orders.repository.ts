import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { In, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ordersEntity } from '../../entities/orders.entity';
import { usersEntity } from '../../entities/users.entity';
import { ordersDetailEntity } from '../../entities/orderdetails.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataSource } from 'typeorm';
import { productsEntity } from '../../entities/products.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ordersRepository {
  constructor(
    @InjectRepository(usersEntity)
    private usersRepository: Repository<usersEntity>,
    @InjectRepository(ordersEntity)
    private ordersRepository: Repository<ordersEntity>,
    @InjectRepository(ordersDetailEntity)
    private ordersDetailRepository: Repository<ordersDetailEntity>,
    @InjectRepository(productsEntity)
    private productsRepository: Repository<productsEntity>,
  ) {}
  async getOrder(id: string = uuid()) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['orderDetails_id'],
    });
    if (!order)
      throw new BadRequestException({
        message: 'order not found',
      });
    return order;
  }

  async addOrder(data: CreateOrderDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id: data.userId });
      if (!user)
        throw new BadRequestException({
          HttpStatus: 404,
          message: 'User not found',
        });

      const order = this.ordersRepository.create({ user_id: user });
      const saveOrder = await this.ordersRepository.save(order);
      
      const IDsArray = data.products.map((product) => {
        return product.id;
      });

      const products = await this.productsRepository.find({
        where: { id: In(IDsArray), stock: MoreThan(0) },
      });
      if (!products[0])
        throw new BadRequestException({
          HttpStatus: 404,
          message: 'products not founds',
        });

      let price:number = 0;
      
      products.forEach(async (product) => {
        price += Number(product.price.toString());

        product.stock --
        await this.productsRepository.save(product);
      });

      /* newProducts.forEach(async (product) => {
        await this.productsRepository.save(product)
      }) */

      const orderdetails = this.ordersDetailRepository.create({
        order_id: saveOrder.id,
        price: price,
        products:products
      });
      if(isNaN(price)) throw new BadRequestException("the price dont exist")
      await this.ordersDetailRepository.save(orderdetails);

      return order;
    } catch (error: any) {
      throw new BadRequestException({
        HttpStatus: 500,
        message: error.message,
      });
    }
  }
}
