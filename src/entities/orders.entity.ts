import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { usersEntity } from "./users.entity";
import { ordersDetailEntity } from "./orderdetails.entity";
import { v4 as uuid } from "uuid";

@Entity("orders")
export class ordersEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @CreateDateColumn()
    date:Date;

    @ManyToOne(() => usersEntity)
    user_id:usersEntity;
    
    @OneToOne(() => ordersDetailEntity, (ordersDetails)=>ordersDetails.order_id)
    orderDetails_id:string = uuid();
}