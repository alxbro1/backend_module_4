import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { productsRepository } from './products.repository';
import { categoriesRepository } from '../categories/categories.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationsDTO } from './dto/pagination.dto';
import { productsEntity } from '../../entities/products.entity';
import { categoryEntity } from '../../entities/categories.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepo: productsRepository;
  let categoryRepo: categoriesRepository;

  const mockCategory: categoryEntity = {
      id: 'category123',
      name: 'smartphone',
      product: new productsEntity
  };

  const mockProduct: productsEntity = {
    id: 'product123',
    name: 'Iphone 15',
    description: 'The best smartphone',
    price: 199.99,
    stock: 10,
    imgUrl: 'https://example.com/img.jpg',
    category_id: mockCategory,
    ordersDetail: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: productsRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest
              .fn()
              .mockResolvedValue({ ...mockProduct, name: 'Iphone 15 Pro' }),
            delete: jest.fn().mockResolvedValue('product deleted succesfuly'),
          },
        },
        {
          provide: categoriesRepository,
          useValue: {
            addCategory: jest.fn().mockResolvedValue(mockCategory),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepo = module.get<productsRepository>(productsRepository);
    categoryRepo = module.get<categoriesRepository>(categoriesRepository);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Iphone 15',
        description: 'The best smartphone',
        price: 199.99,
        stock: 10,
        imgUrl: 'https://example.com/img.jpg',
        category: 'smartphone',
      };

      const result = await service.create(createProductDto);

      expect(categoryRepo.addCategory).toHaveBeenCalledWith({
        name: createProductDto.category,
      });
      expect(productRepo.create).toHaveBeenCalledWith(
        mockCategory,
        createProductDto,
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const paginationDto: PaginationsDTO = { page: 1, limit: 10 };
      const result = await service.findAll(paginationDto);

      expect(productRepo.findAll).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = 'product123';
      const result = await service.findOne(id);

      expect(productRepo.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = 'product123';
      const updateProductDto: UpdateProductDto = {
        name: 'Iphone 15 Pro',
        description: 'Improved version',
        price: 249.99,
        stock: 5,
      };
      const updatedProduct = { ...mockProduct, ...updateProductDto };

      jest.spyOn(productRepo, 'update').mockResolvedValue(updatedProduct);

      const result = await service.update(id, updateProductDto);

      expect(productRepo.update).toHaveBeenCalledWith(id, updateProductDto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const id = 'product123';
      const result = await service.remove(id);

      expect(productRepo.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual('product deleted succesfuly');
    });
  });
});
