import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { categoryEntity } from "../../entities/categories.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class categoriesRepository{

    constructor(@InjectRepository(categoryEntity) private categoriesRepository:Repository<categoryEntity>){}

    async getCategory(){

    }

    async addCategory(data:CreateCategoryDto){
      const {name} = data
        const categoryVerifier = await this.categoriesRepository.findOneBy({
          name: name,
        });
        if (!categoryVerifier) {
          const newCategory = this.categoriesRepository.create({
            name: name,
          });
          return await this.categoriesRepository.save(newCategory);
        }
        return categoryVerifier
    }
}