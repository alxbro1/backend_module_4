import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoryEntity } from '../../entities/categories.entity';
import { categoriesRepository } from './categories.repository';

@Module({
  imports:[TypeOrmModule.forFeature([categoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService, categoriesRepository],
})
export class CategoriesModule {}
