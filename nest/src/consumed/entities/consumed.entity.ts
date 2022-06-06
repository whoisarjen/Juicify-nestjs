import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import moment from 'moment';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Consumed {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { description: 'id' })
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ referencedColumnName: 'id', name: 'user' })
    @Field(() => User, { description: 'Created by' })
    user: User;

    @ManyToOne(() => Product)
    @JoinColumn({ referencedColumnName: 'id', name: 'product' })
    @Field(() => Product, { description: 'Product' })
    product: Product;

    @Column({ type: 'real', default: 1 })
    @Field(() => Float, { description: 'How many times 100g of product' })
    howMany: number

    @Column({ type: 'smallint', default: 1 })
    @Field(() => Int, { description: 'Number of meat' })
    meal: number

    @Column({ type: 'date' })
    @Field(() => Date, { description: 'Day of eatting' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    date: Date
}
