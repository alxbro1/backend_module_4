import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from '../../entities/products.entity';
import { categoryEntity } from '../../entities/categories.entity';
import { categoriesRepository } from '../categories/categories.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([productsEntity, categoryEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    productsRepository,
    categoriesRepository,
    CloudinaryService,
    categoriesRepository,
  ],
  exports: [
    ProductsService,
    productsRepository
  ],
})
export class ProductsModule {}
