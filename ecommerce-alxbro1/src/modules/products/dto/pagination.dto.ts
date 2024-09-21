import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationsDTO {
  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  page: number;

  @ApiProperty({
    description:
      'The maximum number of items to display per page, with a minimum of 1 and a maximum of 5.',
    example: 5,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  limit: number;
}
