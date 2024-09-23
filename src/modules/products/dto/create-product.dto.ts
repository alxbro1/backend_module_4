import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Wireless Mouse',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example:
      'A high-quality wireless mouse with ergonomic design and long battery life.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: 'Price of the product in USD',
    example: 29.99,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Available stock of the product',
    example: 150,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'URL of the product image',
    example: 'https://example.com/images/product.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  imgUrl?: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics',
  })
  @IsString()
  @Length(3, 20)
  category: string;
}
