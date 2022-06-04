import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Field(() => ID, { description: '_id of user' })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    confirmationToken: string

    @Prop({ required: true, default: false })
    isConfirmed: boolean

    @Prop({ required: true, immutable: true, unique: true })
    email: string

    @Prop({ required: true, immutable: true, unique: true })
    @Field(() => String, { description: 'Login' })
    login: string

    @Prop()
    @Field(() => Int, { description: 'Length of login' })
    l: number

    @Prop({ required: true })
    password: string

    @Prop({ required: true, default: Date.now })
    killTokenOlderThan: Date

    @Prop()
    refreshPasswordToken?: string

    @Prop({ required: true })
    @Field(() => Boolean, { description: 'Sex of user' })
    sex: boolean

    @Prop({ required: true, default: 5 })
    @Field(() => Int, { description: 'Number of meals of user' })
    meal_number: number

    @Prop({ required: true, immutable: true, default: false })
    @Field(() => Boolean, { description: 'Is user an Admin' })
    isAdmin: boolean

    @Prop({ required: true, default: true })
    @Field(() => Boolean, { description: 'Is profile public' })
    isPublic: boolean

    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is account banned' })
    isBanned: boolean

    @Prop({ required: true })
    @Field(() => Int, { description: 'Height' })
    height: number

    @Prop()
    @Field(() => String, { description: 'Twitter' })
    twitter?: string

    @Prop()
    @Field(() => String, { description: 'Website' })
    website?: string

    @Prop()
    @Field(() => String, { description: 'Facebook' })
    facebook?: string

    @Prop()
    @Field(() => String, { description: 'Instagram' })
    instagram?: string

    @Prop()
    @Field(() => String, { description: 'Name' })
    name?: string

    @Prop()
    @Field(() => String, { description: 'Surname' })
    surname?: string

    @Prop()
    @Field(() => String, { description: 'Description' })
    description?: string

    @Prop({ required: true })
    @Field(() => Date, { description: 'Birth date' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    birth: Date

    @Prop({ required: true, default: 0 })
    @Field(() => Float, { description: 'Expected weekly progress in weight' })
    goal: number

    @Prop({ required: true, default: '2020-01-01' })
    @Field(() => Date, { description: 'Date for next visit in coach' })
    coach: Date

    // coach_analyze
    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is user while dieting' })
    isCoachAnalyze: boolean

    // water_adder
    @Prop({ required: true, default: true })
    @Field(() => Boolean, { description: 'Is water adder available' })
    isWaterAdder: boolean

    // workout_watch
    @Prop({ required: true, default: true })
    @Field(() => Boolean, { description: 'Is workout watch available' })
    isWorkoutWatch: boolean

    // sport_active
    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is user doing extra activity' })
    isSportActive: boolean

    // kind_of_diet
    // Can be new class basiclly or enum
    @Prop({ required: true, default: 0 })
    @Field(() => Int, { description: 'What kind of diet user prefer' })
    kindOfDiet: number

    // activity
    @Prop({ required: true, default: 1 })
    @Field(() => Int, { description: 'Level of activity' })
    activityLevel: number

    @Prop({ required: true, default: 25 })
    @Field(() => Int, { description: 'Gram of fiber per day' })
    fiber: number

    // sugar_percent
    @Prop({ required: true, default: 10 })
    @Field(() => Int, { description: '% of carbs as sugar' })
    carbsPercentAsSugar: number

    @Prop({ required: true, default: [] })
    @Field(() => [Macronutrients], { description: 'Macronutrients' })
    macronutrients: [Macronutrients]

    @Field(() => String, { nullable: true, description: 'Placeholder allowing to query for token, while login' })
    token?: string

    comparePassword: (candidatePassword: string) => Promise<boolean>
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ login: 1 })

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user: User = this;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

UserSchema.pre("save", async function (next) {
    let user: any = this

    if (user.isNew) {
        let macronutrients = []
        for (let i = 0; i < 7; i++) {
            macronutrients.push({
                proteins: 0,
                carbs: 0,
                fats: 0
            })
        }
        user.macronutrients = macronutrients
        user.l = user.login.length
    }

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTORY as string) || 10);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    user.refreshPasswordToken = null

    return next();
})

@Schema()
@ObjectType()
export class Macronutrients {
    @Prop({ required: true, default: 0 })
    @Field(() => Int, { description: 'Number of proteins per day' })
    proteins: number

    @Prop({ required: true, default: 0 })
    @Field(() => Int, { description: 'Number of carbs per day' })
    carbs: number

    @Prop({ required: true, default: 0 })
    @Field(() => Int, { description: 'Number of fats per day' })
    fats: number
}
