import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type DailyDocument = Daily & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Daily {
	@Field(() => String, { description: 'id' })
	id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    @Field(() => Date, { description: 'Daily for date' })
    whenAdded: Date;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	@Field(() => User, { description: 'Created by' })
	user: User;

    @Prop({ nullable: true })
    @Field(() => Date, { nullable: true, description: 'Created at' })
    createdAt?: Date;

    @Prop({ nullable: true })
    @Field(() => Date, { nullable: true, description: 'Last updated at' })
    updatedAt?: Date;
}

export const DailySchema = SchemaFactory.createForClass(Daily);

DailySchema.index({ whenAdded: 1, user: 1 })
