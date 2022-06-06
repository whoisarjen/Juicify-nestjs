import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { description: 'id' })
    id: number;

    @Column({ type: 'char', length: 32 })
    confirmation_token: string

    @Column({ type: 'bool', default: false })
    is_confirmed: boolean

    @Column({ length: 255 })
    email: string

    @Index({ unique: true })
    @Column({ length: 60 })
    @Field(() => String, { description: 'Login' })
    login: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'timestamp', default: new Date() })
    kill_token_older_than: Date

    @Column({ type: 'char', length: 32, default: null })
    refresh_password_token?: string

    @Column({ type: 'bool' })
    @Field(() => Boolean, { description: 'Sex of user' })
    sex: boolean

    @Column({ type: 'smallint', default: 5 })
    @Field(() => Int, { description: 'Number of meals of user' })
    number_of_meals: number

    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { description: 'Is user an Admin' })
    is_admin: boolean

    @Column({ type: 'bool', default: true })
    @Field(() => Boolean, { description: 'Is profile public' })
    is_public: boolean

    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { description: 'Is account banned' })
    is_banned: boolean

    @Column({ type: 'smallint' })
    @Field(() => Int, { description: 'Height' })
    height: number

    @Column({ length: 255, default: null })
    @Field(() => String, { description: 'Twitter' })
    twitter?: string

    @Column({ length: 255, default: null })
    @Field(() => String, { description: 'Website' })
    website?: string

    @Column({ length: 255, default: null })
    @Field(() => String, { description: 'Facebook' })
    facebook?: string

    @Column({ length: 255, default: null })
    @Field(() => String, { description: 'Instagram' })
    instagram?: string

    @Column({ length: 60, default: null })
    @Field(() => String, { description: 'Name' })
    name?: string

    @Column({ length: 60, default: null })
    @Field(() => String, { description: 'Surname' })
    surname?: string

    @Column({ length: 255, default: null })
    @Field(() => String, { description: 'Description' })
    description?: string

    @Column({ type: 'date' })
    @Field(() => Date, { description: 'Birth date' })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    birth: Date

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Float, { description: 'Expected weekly progress in weight' })
    goal: number

    @Column({ type: 'date', default: '2020-01-01'  })
    @Field(() => Date, { description: 'Date for next visit in coach' })
    coach: Date

    // coach_analyze
    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { description: 'Is user while dieting' })
    is_coach_analyze: boolean

    // water_adder
    @Column({ type: 'bool', default: true })
    @Field(() => Boolean, { description: 'Is water adder available' })
    is_water_adder: boolean

    // workout_watch
    @Column({ type: 'bool', default: true })
    @Field(() => Boolean, { description: 'Is workout watch available' })
    is_workout_watch: boolean

    // sport_active
    @Column({ type: 'bool', default: false })
    @Field(() => Boolean, { description: 'Is user doing extra activity' })
    is_sport_active: boolean

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'What kind of diet user prefer' })
    kind_of_diet: number

    // activity
    @Column({ type: 'smallint', default: 1 })
    @Field(() => Int, { description: 'Level of activity' })
    activity_level: number

    @Column({ type: 'smallint', default: 25 })
    @Field(() => Int, { description: 'Gram of fiber per day' })
    fiber: number

    // sugar_percent
    @Column({ type: 'smallint', default: 10 })
    @Field(() => Int, { description: '% of carbs as sugar' })
    carbs_percent_as_sugar: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_0: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_0: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_0: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_1: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_1: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_1: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_2: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_2: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_2: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_3: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_3: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_3: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_4: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_4: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_4: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_5: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_5: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_5: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of proteins per day' })
    proteins_day_6: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of carbs per day' })
    carbs_day_6: number

    @Column({ type: 'smallint', default: 0 })
    @Field(() => Int, { description: 'Grams of fats per day' })
    fats_day_6: number

	@CreateDateColumn() created: Date

	@UpdateDateColumn() updated: Date

    @Field(() => String, { nullable: true, description: 'Placeholder allowing to query for token, while login' })
    token?: string

    @BeforeInsert()
    async hashPassword () {
        const user: User = this;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(user.password, salt);
        user.password = hash;
    }

    public async comparePassword (candidatePassword: string): Promise<boolean> {
        const user: User = this;

        return bcrypt.compare(candidatePassword, user.password).catch(e => false)
    }
}
