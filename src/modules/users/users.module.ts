import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersEntity } from '../../entities/users.entity';
import { ordersDetailEntity } from '../../entities/orderdetails.entity';
import { ordersEntity } from '../../entities/orders.entity';

@Module({
  imports:[TypeOrmModule.forFeature([usersEntity, ordersDetailEntity, ordersEntity])],
  controllers: [UsersController],
  providers: [UsersService, userRepository],
  exports:[userRepository]
})
export class UsersModule {}
