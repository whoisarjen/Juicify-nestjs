import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateConsumedInput {
    @Field(() => Int, { description: 'Created by' })
    user: User;

    @Field(() => Int, { description: 'Product' })
    product: Product;

    @Field(() => Float, { description: 'How many times 100g of product' })
    howMany: number

    @Field(() => Int, { description: 'Number of meat' })
    meal: number

    @Field(() => Date, { description: 'Day of eatting' })
    date: Date
}
