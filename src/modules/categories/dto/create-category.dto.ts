import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description:
      'The name of the category. It must be between 3 and 20 characters long.',
    example: 'Electronics',
  })
  @IsString()
  @Length(3, 20)
  name: string;
}
