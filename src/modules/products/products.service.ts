import { Injectable } from '@nestjs/common';
import { productsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { categoriesRepository } from '../categories/categories.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationsDTO } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: productsRepository, private readonly categoryRepository:categoriesRepository) {}
  async create(data: CreateProductDto) {
    const category = await this.categoryRepository.addCategory({name:data.category})
    return await this.repository.create(category, data);
  }

  async findAll(pagination:PaginationsDTO) {
    return await this.repository.findAll(pagination.page, pagination.limit);
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async productsSeeding() {
    return await this.repository.seedProducts()
  }
  
  async update(id: string, body: UpdateProductDto) {
    return await this.repository.update(id, body);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
