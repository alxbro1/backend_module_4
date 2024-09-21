import { IsUrl, Max } from 'class-validator';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ordersDetailEntity } from './orderdetails.entity';
import { categoryEntity } from './categories.entity';
import { v4 as uuid } from 'uuid';

@Entity("products")
export class productsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  @Max(50)
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'varchar',
    default:
      'https://img.freepik.com/vector-gratis/fondo-estudio-blanco-plataforma-visualizacion-podio_1017-37977.jpg?t=st=1726193092~exp=1726196692~hmac=8a52c817d5b9dad06ce8514421140944e3f3c1e642319dec1cb5ff1bf9bf7704&w=900',
  })
  @IsUrl()
  imgUrl: string;

  @ManyToOne((type) => categoryEntity)
  @JoinColumn()
  category_id: categoryEntity;

  @ManyToMany((type) => ordersDetailEntity,(orderDetail) => orderDetail.products)
  ordersDetail: ordersDetailEntity[];
}
