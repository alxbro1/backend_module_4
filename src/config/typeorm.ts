import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv'
import { usersEntity } from '../entities/users.entity';
import { productsEntity } from '../entities/products.entity';
import { ordersDetailEntity } from '../entities/orderdetails.entity';
import { ordersEntity } from '../entities/orders.entity';
import { categoryEntity } from '../entities/categories.entity';

config();

const configService = new ConfigService();
console.log(process.env.DB_URL);
export const AppDataSource = new DataSource({
  type: 'postgres',
  host:configService.get('POSTGRES_HOST'),
  database:configService.get('POSTGRES_DB'),
  password: configService.get('POSTGRES_PASSWORD'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  logging: true,
  synchronize: false,
  dropSchema: false,
  entities: [
    usersEntity,
    productsEntity,
    ordersDetailEntity,
    ordersEntity,
    categoryEntity,
  ],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'custom_migration_table',
  migrationsRun: true,
});
