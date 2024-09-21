import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from '../auth/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { usersEntity } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userRepository {
  constructor(
    @InjectRepository(usersEntity)
    private usersRepository: Repository<usersEntity>,
  ) {}

  async findAllUsers(): Promise<Omit<usersEntity, 'password'>[]> {
    return await this.usersRepository.find({
      select: [
        'address',
        'city',
        'country',
        'email',
        'id',
        'name',
        'orders',
        'phone',
        'role',
      ],
    });
  }

  async findOneUser(
    id: string = uuid(),
  ): Promise<usersEntity | null> {
    console.log(id);
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .select(['user', 'orders.id', 'orders.date'])
      .where('user.id = :id', { id })
      .getOne();
   
  }

  async create(data: Omit<usersEntity, 'orders' | 'id'>) {
    try {
      const user = this.usersRepository.create(data);
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('creation user failed');
    }
  }

  async update(id: string = uuid(), body: UpdateUserDto): Promise<string> {
    try {
      const affected = await this.usersRepository.update(id, body);
      if (!affected) throw Error();
    } catch (error) {
      throw new BadRequestException({
        HttpStatus: 404,
        message: 'user not found',
      });
    }
    return 'Update succesfuly';
  }

  async delete(id: string = uuid()): Promise<string> {
    try {
      const result = await this.usersRepository.delete({ id: id });
      if (!result) throw Error();
    } catch (error) {
      throw new BadRequestException({
        HttpStatus: 404,
        message: 'user not found',
      });
    }
    return 'Delete succesfuly';
  }

  async singin(credentials: loginUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: credentials.email,
    });
    if (!user) throw new UnauthorizedException();

    const passwordValidation = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!passwordValidation) throw new UnauthorizedException();

    return user;
  }

  async ifExistForEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (user)
      throw new BadRequestException(
        `user exist, change your email or login width ${email}`,
      );
  }
}
