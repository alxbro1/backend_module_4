import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('singin')
  async login(@Body() credentials: loginUserDto) {
    const user = await this.authService.singin(credentials);

    const token = await this.jwtService.sign({
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {succes:'User logged succesfuly', token}
  }

  @Post('singup')
  singup(@Body() data: CreateUserDto) {
    return this.authService.created(data);
  }
}
