import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { productsEntity } from '../../entities/products.entity';
import { categoryEntity } from '../../entities/categories.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class productsRepository {
  constructor(
    @InjectRepository(productsEntity)
    private productsRepository: Repository<productsEntity>,
    @InjectRepository(categoryEntity)
    private categoriesRepository: Repository<categoryEntity>,
    private datasource: DataSource,
  ) {}

  private products = [
    {
      name: 'Iphone 15',
      description: 'The best smartphone in the world',
      price: 199.99,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Samsung Galaxy S23',
      description: 'The best smartphone in the world',
      price: 150.0,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Motorola Edge 40',
      description: 'The best smartphone in the world',
      price: 179.89,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Samsung Odyssey G9',
      description: 'The best monitor in the world',
      price: 299.99,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'LG UltraGear',
      description: 'The best monitor in the world',
      price: 199.99,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'Acer Predator',
      description: 'The best monitor in the world',
      price: 150.0,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'Razer BlackWidow V3',
      description: 'The best keyboard in the world',
      price: 99.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Corsair K70',
      description: 'The best keyboard in the world',
      price: 79.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Logitech G Pro',
      description: 'The best keyboard in the world',
      price: 59.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Razer Viper',
      description: 'The best mouse in the world',
      price: 49.99,
      stock: 12,
      category: 'mouse',
    },
    {
      name: 'Logitech G502 Pro',
      description: 'The best mouse in the world',
      price: 39.99,
      stock: 12,
      category: 'mouse',
    },
    {
      name: 'SteelSeries Rival 3',
      description: 'The best mouse in the world',
      price: 29.99,
      stock: 12,
      category: 'mouse',
    },
  ];

  async findAll(page: number, limit: number): Promise<productsEntity[]> {
    try {
      const firstElement = (page - 1) * limit;

      const data = await this.productsRepository.find({
        take: limit,
        skip: firstElement,
      });

      return data;
    } catch (error) {
      throw new BadRequestException('Products not found');
    }
  }

  async findOne(id: string): Promise<productsEntity> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) throw Error();
      return product;
    } catch (error) {
      throw new BadGatewayException('User not found');
    }
  }

  async create(category: categoryEntity, data: CreateProductDto) {
    const newProduct = await this.productsRepository.create({
      ...data,
      category_id: category,
    });
    return await this.productsRepository.save(newProduct);
  }

  async seedProducts() {
    const queryRunner = this.datasource.createQueryRunner();

    const promises = this.products.map(async (product) => {
      const productValidate = await this.productsRepository.findOneBy({
        name: product.name,
      });
      if (!productValidate) {
        const categoryObject = await this.categoriesRepository.findOneBy({
          name: product.category,
        });
        const { category, ...rest } = product;
        if (categoryObject) {
          const newProduct = this.productsRepository.create({
            ...rest,
            category_id: categoryObject,
          });
          await queryRunner.manager.save(newProduct);
        }
      }
    });
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      await Promise.all(promises);
      await queryRunner.commitTransaction();
      console.log('products created succeful');
    } catch (error) {
      queryRunner.rollbackTransaction();
      console.log('Error loadding products');
    } finally {
      queryRunner.release();
      console.log('preload of products finally');
    }
  }

  async update(id: string, data: UpdateProductDto): Promise<productsEntity> {
    let product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new BadGatewayException('product not found');
    product = { ...product, ...data };
    return await this.productsRepository.save(product);
  }

  async delete(id: string) {
    const result = await this.productsRepository.delete({id}) 
    if (result.affected && result.affected < 1)
      throw new BadRequestException('product not found');
    return "product deleted succesfuly"
  }
}