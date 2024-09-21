import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { categoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: categoriesRepository;

  const mockCategoryRepository = {
    addCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: categoriesRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<categoriesRepository>(categoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const categoryDto: CreateCategoryDto = { name: 'smartphone' };
      const savedCategory = { id: '123', name: 'smartphone' };

      mockCategoryRepository.addCategory.mockResolvedValue(savedCategory);

      const result = await service.create(categoryDto);
      expect(result).toEqual(savedCategory);
      expect(mockCategoryRepository.addCategory).toHaveBeenCalledWith(
        categoryDto,
      );
    });

    it('should return an existing category if it already exists', async () => {
      const categoryDto: CreateCategoryDto = { name: 'smartphone' };
      const existingCategory = { id: '123', name: 'smartphone' };

      mockCategoryRepository.addCategory.mockResolvedValue(existingCategory);

      const result = await service.create(categoryDto);
      expect(result).toEqual(existingCategory);
      expect(mockCategoryRepository.addCategory).toHaveBeenCalledWith(
        categoryDto,
      );
    });
  });
});
