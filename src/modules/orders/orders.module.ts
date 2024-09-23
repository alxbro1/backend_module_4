import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersRepository } from './orders.repository';
import { productsEntity } from '../../entities/products.entity';
import { ordersDetailEntity } from '../../entities/orderdetails.entity';
import { usersEntity } from '../../entities/users.entity';
import { ordersEntity } from '../../entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([productsEntity, ordersDetailEntity, ordersEntity, usersEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, ordersRepository,],
})
export class OrdersModule {}
