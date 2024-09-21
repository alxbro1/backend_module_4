import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './global.middleware';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeStampInterceptor } from './interceptors/time-stamp.interceptor';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './config/typeorm';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config()
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'./.env'
  }),
    TypeOrmModule.forRoot(AppDataSource.options),
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:"1h"},
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeStampInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
