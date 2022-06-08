import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserConsumedInput {
    @Field(() => String, { description: 'Created by' })
    login: string;

    @Field(() => Date, { description: 'Day of eatting' })
    date: Date
}
