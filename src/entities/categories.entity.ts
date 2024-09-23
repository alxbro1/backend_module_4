import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { productsEntity } from "./products.entity";
import { v4 as uuid } from "uuid";

@Entity('categories')
export class categoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @OneToMany((type) => productsEntity,(product) => {
    product.category_id
  })
  product: productsEntity;
}