import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '../products/products.service';
import { productsRepository } from '../products/products.repository';
import { categoriesRepository } from '../categories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from '../../entities/products.entity';
import { categoryEntity } from '../../entities/categories.entity';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([productsEntity, categoryEntity])],
  controllers:[CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, ProductsService, productsRepository, categoriesRepository],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
