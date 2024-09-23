import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guard/AuthGuard';
import { IsAdminGuard } from '../../guards/is-admin/is-admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  async create(@Body() data: CreateProductDto) {
    return await this.productsService.create(data);
  }

  @ApiBearerAuth()
  @Post('seeder')
  async seeder() {
    return await this.productsService.productsSeeding();
  }

  @HttpCode(200)
  @Get(':page/:limit')
  async findAll(@Param('page') page: string, @Param('limit') limit: string) {
    return await this.productsService.findAll({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return await this.productsService.update(id, data);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.remove(id);
  }
}
