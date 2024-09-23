import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @Post('seeder')
  async seeder() {
    return await this.categoriesService.seeder();
  }

  @ApiBearerAuth()
  @Post()
  async create(@Body() name: CreateCategoryDto) {
    return await this.categoriesService.create(name);
  }
}
