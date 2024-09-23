import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user, between 3 and 80 characters.',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    description:
      'A valid email address of the user, between 3 and 50 characters.',
    example: 'pepito44@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 50)
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description:
      'A secure password, between 8 and 15 characters. Must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    example: 'Password123@',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password too weak. It must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation, must match the original password.',
    example: 'StrongPassw0rd!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password too weak. It must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'The address of the user, between 3 and 80 characters.',
    example: '123 Main St, Springfield',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({
    description: 'The user’s phone number, must be a valid integer.',
    example: 1234567890,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  phone: number;

  @ApiProperty({
    description:
      'The country where the user resides, between 3 and 50 characters.',
    example: 'United States',
  })
  @IsString()
  @Length(3, 50)
  @MaxLength(50)
  country: string;

  @ApiProperty({
    description:
      'The city where the user resides, between 5 and 20 characters.',
    example: 'New York',
  })
  @IsString()
  @Length(5, 20)
  @MinLength(3)
  @MaxLength(20)
  city: string;
}
