import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userRepository } from '../users/users.repository';
import { AuthGuard } from './guard/AuthGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersEntity } from '../../entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([usersEntity])],
  controllers: [AuthController],
  providers: [AuthService, userRepository, AuthGuard, userRepository],
})
export class AuthModule {}
