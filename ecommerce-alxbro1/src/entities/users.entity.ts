import { IsEmail, Max, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ordersEntity } from './orders.entity';
import { v4 as uuid } from 'uuid';
import { enumRole } from '../modules/auth/dto/role.enum';

@Entity('users')
export class usersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  @Min(3)
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    type: 'int',
  })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column('varchar')
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @OneToMany(() => ordersEntity, (order) => order.user_id)
  @JoinTable()
  orders?: ordersEntity[];

  @Column({type:'enum', enum:enumRole,  default:enumRole.user})
  role?:enumRole;
}
