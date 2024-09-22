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
  url: configService.get('DB_URL'),
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
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'custom_migration_table',
  migrationsRun: true,
});
