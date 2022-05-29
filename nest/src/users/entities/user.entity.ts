import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Field(() => String, { description: '_id of user' })
    _id: mongoose.Schema.Types.ObjectId;

    // email_confirmation PREV
    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is user confirmed' })
    isConfirmed: boolean

    @Prop({ required: true, immutable: true, unique: true })
    @Field(() => String, { description: 'Email' })
    email: string

    @Field(() => String, { description: 'token to confirm email' })
    email_token: string

    @Prop({ required: true, immutable: true, unique: true })
    @Field(() => String, { description: 'Login' })
    login: string

    @Field(() => Int, { description: 'Length of login' })
    l: number

    @Prop({ required: true })
    @Field(() => String, { description: 'Hash of password' })
    password: string

    // password_remind_hash PREV
    @Field(() => String, { nullable: true, description: 'Token to restart email' })
    password_token?: string

    @Prop({ required: true })
    @Field(() => Boolean, { description: 'Sex of user' })
    sex: boolean

    @Prop({ required: true, default: 5 })
    @Field(() => Int, { description: 'Number of meals of user' })
    meal_number: number

    // users_roles_ID PREV
    @Prop({ required: true, immutable: true, default: false })
    @Field(() => Boolean, { description: 'Is user an Admin' })
    isAdmin: boolean

    // public_profile PREV NUMBER
    @Prop({ required: true, default: true })
    @Field(() => Int, { description: 'Is profile public' })
    isPublic: boolean

    // height: {
    //     type: Number,
    //     required: true
    // },
    // birth: {
    //     type: String,
    //     required: true
    // },
    // goal: {
    //     type: Number,
    //     default: 0
    // },
    // coach: {
    //     type: String,
    //     default: '2020-01-01'
    // },
    // coach_analyze: {
    //     type: Boolean,
    //     default: false
    // },
    // twitter: {
    //     type: String,
    //     default: ''
    // },
    // website: {
    //     type: String,
    //     default: ''
    // },
    // facebook: {
    //     type: String,
    //     default: ''
    // },
    // instagram: {
    //     type: String,
    //     default: ''
    // },
    // name: {
    //     type: String,
    //     default: ''
    // },
    // surname: {
    //     type: String,
    //     default: ''
    // },
    // description: {
    //     type: String,
    //     default: ''
    // },
    // banned: {
    //     type: Boolean,
    //     default: false
    // },
    // avatar: {
    //     type: Boolean,
    //     default: false
    // },
    // water_adder: {
    //     type: Boolean,
    //     default: true
    // },
    // workout_watch: {
    //     type: Boolean,
    //     default: true
    // },
    // kind_of_diet: {
    //     type: Number,
    //     default: 0
    // },
    // sport_active: {
    //     type: Boolean,
    //     default: true
    // },
    // activity: {
    //     type: Number,
    //     default: 1
    // },
    // fiber: {
    //     type: Number,
    //     default: 25
    // },
    // sugar_percent: {
    //     type: Number,
    //     default: 10
    // },
    // macronutrients: [macronutrientsSchema]
}

export const UserSchema = SchemaFactory.createForClass(User);