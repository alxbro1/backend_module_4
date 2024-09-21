import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { productsEntity } from './products.entity';
import { ordersEntity } from './orders.entity';
import { v4 as uuid } from 'uuid';

@Entity('orders_details')
export class ordersDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal' })
  price: number;

  @ManyToMany((type) => productsEntity, (product) => product.ordersDetail, {
    eager:true,
    cascade: true,
  })
  @JoinTable()
  products: productsEntity[];

  @OneToOne(() => ordersEntity, (order) => order.orderDetails_id)
  @JoinColumn()
  order_id: string = uuid();
}
