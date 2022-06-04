import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Product {
    @Field(() => String, { description: '_id' })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ nullable: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Field(() => User, { nullable: true, description: 'Created by' })
    user?: User;

    @Prop({ required: true })
    @Field(() => String, { description: 'Name of product' })
    name: string;

    @Prop({ nullable: true })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    p?: number;

    @Prop({ nullable: true })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    c?: number;

    @Prop({ nullable: true })
    @Field(() => Float, { nullable: true, description: 'Number of grams per 100g/ml' })
    f?: number;

    @Prop({ nullable: true })
    @Field(() => Date, { nullable: true, description: 'Created at' })
    createdAt?: Date;

    @Prop({ nullable: true })
    @Field(() => Date, { nullable: true, description: 'Last updated at' })
    updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
