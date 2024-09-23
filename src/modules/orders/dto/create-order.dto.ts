import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

class productDto {
  @ApiProperty({
    description: 'The unique identifier for the product',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string = uuid();
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The unique identifier for the user making the order',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string = uuid();

  @ApiProperty({
    description:
      'An array of product objects representing the items in the order. Each product must contain a valid UUID.',
    type: [productDto],
    example: [{ id: '550e8400-e29b-41d4-a716-446655440000' }],
  })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => productDto)
  products: productDto[];
}
