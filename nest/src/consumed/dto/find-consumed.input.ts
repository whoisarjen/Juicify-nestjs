import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindConsumedInput {
    @Field(() => String, { description: 'Created by' })
    id: number;

    @Field(() => Date, { description: 'Day of eatting' })
    date: Date
}
