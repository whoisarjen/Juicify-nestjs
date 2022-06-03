import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { Moment } from 'moment';

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field(() => String, { description: 'Email' })
    email: string

    @Field(() => String, { description: 'Login' })
    login: string

    @Field(() => String, { description: 'Password' })
    password: string

    @Field(() => Boolean, { description: 'Sex' })
    sex: boolean

    @Field(() => Int, { description: 'Height' })
    height: number

    @Field(() => Date, { description: 'Birth date' })
    @Transform(({ value }) => moment(value))
    birth: Moment;
}
