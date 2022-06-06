import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindConsumedInput {
    @Field(() => String, { description: 'Created by' })
    login: string;

    @Field(() => Date, { description: 'Day of eatting' })
    date: Date
}
