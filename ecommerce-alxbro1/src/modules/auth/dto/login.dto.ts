import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class loginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
