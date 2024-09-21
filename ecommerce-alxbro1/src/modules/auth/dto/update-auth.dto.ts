import { PartialType } from '@nestjs/mapped-types';
import { loginUserDto } from './login.dto';

export class UpdateAuthDto extends PartialType(loginUserDto) {}
