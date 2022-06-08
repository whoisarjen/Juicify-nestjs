import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateConsumedInput {
    @Field(() => ID, { description: 'id' })
    id: number;

    @Field(() => Float, { description: 'How many times 100g of product' })
    how_many?: number

    @Field(() => Int, { description: 'Number of meat' })
    meal?: number
}
