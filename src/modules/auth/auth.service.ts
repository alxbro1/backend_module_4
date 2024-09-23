import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { loginUserDto } from './dto/login.dto';
import { userRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: userRepository,
    private readonly jwtService: JwtService,
  ) {}
  async singin(credentials: loginUserDto) {

    return await this.userRepository.singin(credentials);
  }

  async created(data: CreateUserDto) {
    await this.userRepository.ifExistForEmail(data.email);

    if(data.password != data.confirmPassword) throw new BadRequestException(
      'Passwords do not match. Please ensure both password and confirm password are identical.',
    );

    const passwordHashed = await bcrypt.hash(data.password, 10);
    if (!passwordHashed)
      throw new InternalServerErrorException('internal server error');

    data.password = passwordHashed;
    const user = await this.userRepository.create(data);
    const {password, ...rest} = user
    return rest
  }
}
