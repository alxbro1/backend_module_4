import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: categoriesRepository) {}

  private categoriesArr = ['smartphone', 'monitor', 'keyboard', 'mouse'];

  async seeder() {
    this.categoriesArr.forEach(async (category) => {
      try{
        await this.categoriesRepository.addCategory({name:category})
      }catch(err){
        console.log("charge of categories failed")
      }
    })
    console.log("charge of categories Succesfuly")
  }
  async create(name: CreateCategoryDto) {
    return await this.categoriesRepository.addCategory(name);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
