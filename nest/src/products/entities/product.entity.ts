import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => String, { description: 'id' })
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ referencedColumnName: 'id', name: 'user' })
    @Field(() => User, { nullable: true, description: 'Created by' })
    user?: User;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Field(() => String, { description: 'Name of product' })
    name: string;

    @Column({ type: 'real', default: 0 })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    proteins: number;

    @Column({ type: 'real', default: 0 })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    carbs: number;

    @Column({ type: 'real', default: 0 })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    sugar: number;

    @Column({ type: 'real', default: 0 })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    fats: number;

    @Column({ type: 'real', default: 0 })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    fiber: number;

    @Column({ type: 'int', default: null })
    @Field(() => Int, { nullable: true, description: 'Barcode' })
    barcode: number;

    // PREV "v"
    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { nullable: true, description: 'Verified' })
    isVerified: boolean;

    // PREV "deleted"
    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { nullable: true, description: 'Deleted' })
    isDeleted: boolean;

    // @Column()
    // @Field(() => Date, { nullable: true, description: 'Created at' })
    // createdAt?: Date;

    // @Column()
    // @Field(() => Date, { nullable: true, description: 'Last updated at' })
    // updatedAt?: Date;
}
