import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { userRepository } from './users.repository';
import IUser from './Interface/iUser';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersEntity } from '../../entities/users.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: userRepository) {}

  async findAll(): Promise<Omit<usersEntity, 'password'>[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: string): Promise<Omit<usersEntity, 'password'>> {
    const user = await this.userRepository.findOneUser(id);

    if (!user)
      throw new BadRequestException({
        HttpStatus: 404,
        message: 'User not found',
      });

    const { password, ...rest } = user;
    return rest;
  }

  async update(id: string, body: UpdateUserDto) {
    return await this.userRepository.update(id, body);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
