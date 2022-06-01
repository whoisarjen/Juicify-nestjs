import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Field(() => ID, { description: '_id of user' })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    confirmationToken: string

    // email_confirmation PREV
    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is user confirmed' })
    isConfirmed: boolean

    @Prop({ required: true, immutable: true, unique: true })
    @Field(() => String, { description: 'Email' })
    email: string

    @Prop({ required: true, immutable: true, unique: true })
    @Field(() => String, { description: 'Login' })
    login: string

    @Prop()
    @Field(() => Int, { description: 'Length of login' })
    l: number

    @Prop({ required: true })
    password: string

    // password_remind_hash PREV
    @Prop()
    @Field(() => String, { description: 'Refresh password token' })
    refreshPasswordToken?: string

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
    @Field(() => Boolean, { description: 'Is profile public' })
    isPublic: boolean

    @Prop({ required: true, default: false })
    @Field(() => Boolean, { description: 'Is account banned' })
    isBanned: boolean

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